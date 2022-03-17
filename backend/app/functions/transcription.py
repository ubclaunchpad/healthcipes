from youtube_transcript_api import YouTubeTranscriptApi
import spacy
from pprint import pprint
import re
from app.functions.ingredient import parse_ingredients_from_text

def fetch_transcript_from_video_url(video_url):
    transcript = None
    video_id = video_url.split('https://www.youtube.com/watch?v=')
    video_id_2 = video_url.split('https://youtu.be/')
    
    print(video_id, video_id_2)

    if len(video_id) == 2:
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id[1])
        except Exception as e:
            print('ERROR', e)

    elif len(video_id_2) == 2:
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id_2[1])
        except Exception as e:
            print('ERROR', e)

    if transcript is None:
        print("ERROR")
    else:
        return transcript

def get_steps_by_capitalization(transcript):
    transcript_alt_text = []
    for i, item in enumerate(transcript):
        if item['text'][0].isupper():
            transcript_alt_text.append(item['text'])
        elif i > 0:
            transcript_alt_text[len(transcript_alt_text) - 1] += ' ' + item['text']
        else:
            transcript_alt_text.append(item['text'])

    # calculate average step length in words : num_steps ratio
    # and split up if too high
    avg_step_length = 0
    if len(transcript_alt_text) == 0:
        print('ERROR: no transcript steps')
    else:
        len_script = 0
        for step in transcript_alt_text:
            len_script += step.count(' ')
        avg_step_length = len_script / len(transcript_alt_text)

    return transcript_alt_text, avg_step_length

def get_steps_by_punctuation(transcript_text):
    transcript_alt_text = []
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(transcript_text)

    assert doc.has_annotation("SENT_START")
    for sent in doc.sents:
        transcript_alt_text.append(sent.sent.text)

    # calculate average step length in words : num_steps ratio
    # and split up if too high
    avg_step_length = 0
    if len(transcript_alt_text) == 0:
        print('ERROR: no transcript steps')
    else:
        len_script = 0
        for step in transcript_alt_text:
            len_script += step.count(' ')
        avg_step_length = len_script / len(transcript_alt_text)

    return transcript_alt_text, avg_step_length

def get_steps_by_verbs(transcript_text):
    transcript_alt_text = []
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(transcript_text)
    verbs = [(token.text, token.i, token.idx) for token in doc if token.pos_ == "VERB"]

    for i, (text, _, idx) in enumerate(verbs):
        if i + 1 < len(verbs):
            transcript_alt_text.append(transcript_text[idx: verbs[i + 1][2]])
        else:
            transcript_alt_text.append(transcript_text[idx:])

    # calculate average step length in words : num_steps ratio
    # and split up if too high
    avg_step_length = 0
    if len(transcript_alt_text) == 0:
        print('ERROR: no transcript steps')
    else:
        len_script = 0
        for step in transcript_alt_text:
            len_script += step.count(' ')
        avg_step_length = len_script / len(transcript_alt_text)

    return transcript_alt_text, avg_step_length

def get_servings_from_transcript(transcript_text):
    match = re.search(r'(\d+) (meals|Meals|people|People|servings|Servings)', transcript_text)
    if match:
        return int(match.group(1))

    match = re.search(r'(meals|Meals|makes|Makes|serves|Serves|servings|Servings)[-:]? (\d+)', transcript_text)
    if match:
        return int(match.group(2))

    return 0

def get_recipe_steps_from_transcript(transcript, transcript_text):
    transcript_alt_text, avg_step_length = get_steps_by_punctuation(transcript_text)

    if avg_step_length >= 5 and avg_step_length <= 50:
        return transcript_alt_text, avg_step_length
    
    transcript_alt_text, avg_step_length = get_steps_by_capitalization(transcript)
    if avg_step_length >= 5 and avg_step_length <= 50:
        return transcript_alt_text, avg_step_length
    
    transcript_alt_text, avg_step_length = get_steps_by_verbs(transcript_text)
    if avg_step_length >= 5 and avg_step_length <= 50:
        return transcript_alt_text, avg_step_length

    return [], -1


def get_recipe_ingredients_from_transcript(transcript_text):
    return parse_ingredients_from_text(transcript_text)

def get_recipe_from_video_url(video_url):
    transcript = fetch_transcript_from_video_url(video_url)
    transcript_text = ' '.join([item['text'] for item in transcript])
    print(transcript_text)

    steps, avg_step_length = get_recipe_steps_from_transcript(transcript, transcript_text)
    ingredients = get_recipe_ingredients_from_transcript(transcript_text)
    servings = get_servings_from_transcript(transcript_text)

    recipe = {
        "recipe_id": "",
        "name": "",
        "recipe_description": "",
        "user_id": "",
        "creator_username": "",
        "header_image": "",
        "protein": 0,
        "carbs": 0,
        "fat": 0,
        "fiber": 0,
        "calories": 0,
        "vegetarian": False,
        "vegan": False,
        "cooking_time": 0,
        "servings": servings
    }

    print(recipe)
    return {
        "recipe": recipe,
        "steps": steps,
        "ingredients": ingredients
    }


# fetch_transcript_from_video_url('https://www.youtube.com/watch?v=NiPZY3UwQn0')
# fetch_transcript_from_video_url('https://youtu.be/NiPZY3UwQn0') # different link style
# fetch_transcript_from_video_url('https://www.youtube.com/watch?v=N6BxCITQSpA') # video w/ only auto-generated subtitles

recipe = {
    "name": "Tantanmen Ramen",
    "recipe_description": "Yummy ramen",
    "user_id": "abc123",
    "creator_username": "chef"
}

# get_recipe_from_video_url('https://www.youtube.com/watch?v=NiPZY3UwQn0', recipe)
# get_recipe_from_video_url('https://www.youtube.com/watch?v=BPl7D20F2mE', recipe) # TASTY - no capitalizations or punctuation, well 2 "."s and 0 ","s
# get_recipe_from_video_url('https://www.youtube.com/watch?v=GLdl71cZXmY') 