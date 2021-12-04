import logging

def create_grocery_list(conn, user_id, grocery_list):
    sql = 'postGroceryList'
    if not is_valid_grocery_list(grocery_list):
        return None

    for ingredient_id in grocery_list:
        cursor = conn.cursor()
        try:
            cursor.callproc(sql, (
                user_id,
                ingredient_id,
            ))
            conn.commit()
        except Exception as e:
            print("MYSQL ERROR:", sql)
            logging.error(e)

    return fetch_grocery_list_by_user(conn.cursor(), user_id)

def get_grocery_list_by_user(cursor, user_id):
    return fetch_grocery_list_by_user(cursor, user_id)

def update_grocery_list_item(conn, cursor, grocery_list_item_id, user_id, obtained_status):
    sql = 'updateGroceryListObtainedStatus'

    try:
        cursor.callproc(sql, (
            grocery_list_item_id,
            user_id,
            obtained_status,
        ))
        conn.commit()
        return "Success"
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)

def remove_grocery_list_item(conn, cursor, grocery_list_item_id, user_id):
    sql = 'deleteGroceryListItem'

    try:
        cursor.callproc(sql, (
            grocery_list_item_id,
            user_id,
        ))
        conn.commit()
        return "Success"
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)

def is_valid_grocery_list(grocery_list):
    if isinstance(grocery_list, list):
        for item in grocery_list:
            if not isinstance(item, str):
                return False
    else:
        return False
    
    return True

def fetch_grocery_list_by_user(cursor, user_id):
    sql = 'getGroceryListByUser'
    try:
        cursor.callproc(sql, (user_id, ))
        raw_result = cursor.fetchall()
        res = {
            "user_id": user_id,
            "grocery_list": [],
        }

        for result in raw_result:
            res["grocery_list"].append(
                {
                    "grocery_list_item_id": result[0],
                    "ingredient_id": result[2],
                    "obtained": result[3]
                }
            )

        return res
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)
