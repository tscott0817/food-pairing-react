from flask import Flask, g
import sqlite3

app = Flask(__name__)
app.config['DATABASE'] = 'data/food_data.db'


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(app.config['DATABASE'])
        g.db.row_factory = sqlite3.Row
    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


@app.before_request
def before_request():
    g.db = get_db()


@app.teardown_request
def teardown_request(exception):
    close_db()