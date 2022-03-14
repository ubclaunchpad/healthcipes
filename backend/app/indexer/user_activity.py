import logging
from app.functions.notification import send_user_activity_notification
from app.constants.user_activity import *

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


def get_user_like_status(cursor, user_id, recipe_id):
    sql_proc = 'userLikedStatus'
    try:
        cursor.callproc(sql_proc, (user_id, recipe_id))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)

def get_like_count(cursor, recipe_id):
    sql_proc = 'getLikeCount'
    try:
        cursor.callproc(sql_proc, (recipe_id, ))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql_proc)
        logging.error(e)

def delete_user_like(conn, cursor, user_id, recipe_id):
    sql_proc = 'deleteUserActivity'
    try:
        cursor.callproc(sql_proc, (user_id, recipe_id))
        conn.commit()
        return "Deleted"
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

    send_user_activity_notification(fk_obj)

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



