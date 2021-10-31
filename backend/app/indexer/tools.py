import logging
import MySQLdb
import os

MYSQL_HOST = os.getenv("MYSQL_HOST", "db")
MYSQL_PORT = os.getenv("MYSQL_PORT", 3306)
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PWD = os.getenv("MYSQL_PWD", "password")
MYSQL_DB = os.getenv("MYSQL_DB", "umami_db")

def connect_mysql():
    try:
        conn = MySQLdb.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            port=MYSQL_PORT,
            password=MYSQL_PWD,
            database=MYSQL_DB,
            local_infile=True
        )
        return conn
    except Exception as e:
        print("MYSQL ERROR: connect failed")
        logging.error(e)

def init_conn():
    conn = connect_mysql()
    cursor = conn.cursor()
    return conn, cursor