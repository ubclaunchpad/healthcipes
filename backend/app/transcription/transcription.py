from youtube_transcript_api import YouTubeTranscriptApi
from pprint import pprint

def fetch_transcript_from_video_link(video_url):
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
        pprint(transcript)
        return transcript

def get_recipe_steps_from_transcript(transcript):
    transcript_text = ' '.join([item['text'] for item in transcript])
    # for item in transcript:
    #     print('Item: ', item)
    print('TEXT:', transcript_text)
    return transcript_text

def get_recipe_ingredients_from_transcript(transcript):
    pass

def get_recipe_from_video_link(video_url):
    transcript = fetch_transcript_from_video_link(video_url)
    steps = get_recipe_steps_from_transcript(transcript)
    ingredients = get_recipe_ingredients_from_transcript(transcript)

# fetch_transcript_from_video_link('https://www.youtube.com/watch?v=NiPZY3UwQn0')
# fetch_transcript_from_video_link('https://youtu.be/NiPZY3UwQn0') # different link style
# fetch_transcript_from_video_link('https://www.youtube.com/watch?v=N6BxCITQSpA') # video w/ only auto-generated subtitles

get_recipe_from_video_link('https://www.youtube.com/watch?v=NiPZY3UwQn0')