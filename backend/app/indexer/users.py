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

    userID = user['userID']
    firstName = user.get('firstName', "")
    lastName = user.get('lastName', "")
    location = user.get('location', "")
    profilePicture = user.get('profilePicture', "")
    recipeDriven = user.get('recipeDriven', True)

    try:
        cursor.callproc(sql, (
            userID,
            firstName, 
            lastName,
            location,
            profilePicture,
            recipeDriven
             ))
        conn.commit()
        return user
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)


def post_user(conn, cursor, user):
    sql = 'postUser'

    userID = user['userID']
    username = user['username']
    firstName = user.get('firstName', "")
    lastName = user.get('lastName', "")
    email = user['email']
    location = user.get('location', "")
    profilePicture = user.get('profilePicture', "")
    recipeDriven = user.get('recipeDriven', True)

    try:
        cursor.callproc(sql, (
            userID,
            username,
            firstName, 
            lastName,
            email,
            location,
            profilePicture,
            recipeDriven
             ))
        conn.commit()
        return user
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)