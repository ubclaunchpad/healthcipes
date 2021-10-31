import logging

def get_user(cursor, userID):
    sql = 'getUser'
    try:
        cursor.callproc(sql, (userID, ))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)

        
def update_user(conn, cursor, user):
    sql = 'updateUser'

    userID = user['user_id']
    firstName = user.get('first_name', "")
    lastName = user.get('last_name', "")
    location = user.get('location', "")
    profilePicture = user.get('profile_picture', "")
    recipeDriven = user.get('recipe_driven', True)
    vegetarian = user.get('vegetarian', False)
    vegan = user.get('vegan', False)
    pescatarian = user.get('pescatarian', False)
    glutenFree = user.get('gluten_free', False)
    dairyFree = user.get('dairy_free', False)
    keto = user.get('keto', False)
    paleo = user.get('paleo', False)
    style = user.get('style', "ANY")
    experience = user.get('experience', 0.5)

    try:
        cursor.callproc(sql, (
            userID,
            firstName, 
            lastName,
            location,
            profilePicture,
            recipeDriven,
            vegetarian,
            vegan,
            pescatarian,
            glutenFree,
            dairyFree,
            keto,
            paleo,
            style,
            experience
            ))
        conn.commit()
        return user
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)


def post_user(conn, cursor, user):
    sql = 'postUser'

    userID = user['user_id']
    username = user['username']
    firstName = user.get('first_name', "")
    lastName = user.get('last_name', "")
    email = user['email']
    location = user.get('location', "")
    profilePicture = user.get('profile_picture', "")
    recipeDriven = user.get('recipe_driven', True)
    vegetarian = user.get('vegetarian', False)
    vegan = user.get('vegan', False)
    pescatarian = user.get('pescatarian', False)
    glutenFree = user.get('gluten_free', False)
    dairyFree = user.get('dairy_free', False)
    keto = user.get('keto', False)
    paleo = user.get('paleo', False)
    style = user.get('style', "ANY")
    experience = user.get('experience', 0.5)

    try:
        cursor.callproc(sql, (
            userID,
            username,
            firstName, 
            lastName,
            email,
            location,
            profilePicture,
            recipeDriven,
            vegetarian,
            vegan,
            pescatarian,
            glutenFree,
            dairyFree,
            keto,
            paleo,
            style,
            experience
            ))
        conn.commit()
        return user
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)