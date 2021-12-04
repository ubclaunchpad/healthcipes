import logging

# USER ACTIVITY TYPES CONSTANTS 
# NOTE: NEED TO REGISTER EVERY TIME EXPAND USER ACTIVITY TYPE
RECIPE_LIKE = 'RECIPE_LIKE'
USER_FOLLOW = 'USER_FOLLOW'
RECIPE_VIEW = 'RECIPE_VIEW'

user_activity_type_constants = {RECIPE_LIKE, USER_FOLLOW, RECIPE_VIEW}


def get_user_activity(cursor, user_id):
    sql_proc = 'getUsersUserActivity'
    try:
        cursor.callproc(sql_proc, (user_id, ))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)


def get_user_activity_recipe_like(cursor, user_id):
    sql_proc = 'getUsersUserActivitySpecificActivity'
    try:
        cursor.callproc(sql_proc, (user_id, RECIPE_LIKE))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)


def get_all_user_activity(cursor):
    sql_proc = 'getAllUserActivity'
    try:
        cursor.callproc(sql_proc) 
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)


def post_user_activity(conn, cursor, user_activity):
    sql = 'postUserActivity'

    user_id = user_activity.get('user_id')
    activity_type = user_activity.get('activity_type')
    _validate_user_activity(activity_type)

    user_follow_id = user_activity.get('user_follow_id')
    recipe_like_id = user_activity.get('recipe_like_id')
    recipe_view_id = user_activity.get('recipe_view_id')

    fk_obj = {
        USER_FOLLOW: user_follow_id,
        RECIPE_LIKE: recipe_like_id,
        RECIPE_VIEW: recipe_view_id
    }

    # NOTE: checks corresponding FK inserted matches the activity_type
    for key in fk_obj:
        if fk_obj[key] and not activity_type == key:
            raise Exception("foreign key doesn't match activity_type")

    try:
        cursor.callproc(sql, (
            user_id,
            activity_type,
            user_follow_id,
            recipe_like_id,
            recipe_view_id,
        ))
        conn.commit()
        return user_activity
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)


def get_ranked_recipes(cursor, activity_type):
    _validate_user_activity(activity_type)
    if activity_type == USER_FOLLOW:
        raise Exception("{} is not avaliable for rank".format(USER_FOLLOW))

    sql = 'rankRecipeByView'
    if activity_type == RECIPE_LIKE:
        sql = "rankRecipeByLike"

    try:
        cursor.callproc(sql) 
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)





def _validate_user_activity(activity_type):
    # NOTE: raise issue if user activity not part of enum
    if activity_type not in user_activity_type_constants:
        raise Exception("user activity {} doesn't exist".format(activity_type))



