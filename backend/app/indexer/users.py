import logging

def get_user(cursor, userID):
    sql = 'getUser'
    try:
        cursor.callproc(sql, (userID, ))
        return cursor.fetchall()
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
    recipeDrive = user.get('recipeDrive', True)

    try:
        cursor.callproc(sql, (
            userID,
            username,
            firstName, 
            lastName,
            email,
            location,
            profilePicture,
            recipeDrive
             ))
        conn.commit()
        return user
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)