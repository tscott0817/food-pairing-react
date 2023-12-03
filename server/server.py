import sqlite3

import requests
from flask import Flask, jsonify, g
from flask_cors import CORS

app = Flask(__name__)
app.config['DATABASE'] = 'data/food_data.db'
CORS(app)  # TODO: Important, react can't access routes without this apparently


# TODO: Not sure which to do
# def get_db():
#     if 'db' not in g:
#         g.db = sqlite3.connect(app.config['DATABASE'])
#         g.db.row_factory = sqlite3.Row
#     return g.db

def get_db():
    return sqlite3.connect(app.config['DATABASE'])


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

@app.route('/api/flavordb/<alias>', methods=['GET'])
def get_flavor_by_alias(alias):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM flavordb WHERE alias = ?", (alias,))
    row = cursor.fetchone()
    data = dict(zip(['index', 'entityID', 'alias', 'synonyms', 'scientificName', 'category', 'molecules'], row)) if row else None
    cursor.close()
    return jsonify({'data': data})


@app.route('/api/flavordb/<int:entity_id>', methods=['GET'])
def get_flavor_by_id(entity_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM flavordb WHERE entityID = ?", (entity_id,))
    row = cursor.fetchone()
    data = dict(zip(['index', 'entityID', 'alias', 'synonyms', 'scientificName', 'category', 'molecules'], row)) if row else None
    cursor.close()
    return jsonify({'data': data})


@app.route('/api/molecules/<int:pubchem_id>', methods=['GET'])
def get_molecule_by_id(pubchem_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM molecules WHERE pubchemID = ?", (pubchem_id,))
    row = cursor.fetchone()
    data = dict(zip(['index', 'pubchemID', 'commonName', 'flavorProfile'], row)) if row else None
    cursor.close()
    return jsonify({'data': data})


@app.route('/api/flavordb/category/<category>', methods=['GET'])
def get_items_by_category_route(category):
    return get_items_by_category(category)


def get_items_by_category(category):
    db = get_db()
    cursor = db.cursor()
    query = "SELECT alias FROM flavordb WHERE category = ?"

    cursor.execute(query, (category,))
    rows = cursor.fetchall()
    aliases = [row[0] for row in rows] if rows else None
    cursor.close()
    return jsonify({'aliases': aliases})


@app.route('/api/common-molecules/<int:entity_id1>/<int:entity_id2>', methods=['GET'])
def get_common_elements_id_route(entity_id1, entity_id2):
    common_elements = get_common_elements_by_id(entity_id1, entity_id2)
    return jsonify({'common_elements': common_elements})


def get_common_elements_by_id(entity_id1, entity_id2):
    common_names1 = set(get_common_names_by_id(entity_id1))
    common_names2 = set(get_common_names_by_id(entity_id2))
    common_elements = list(common_names1.intersection(common_names2))
    return common_elements


def get_common_names_by_id(entity_id):
    db = get_db()
    cursor = db.cursor()

    try:
        query = "SELECT molecules FROM flavordb WHERE entityID = ?"
        cursor.execute(query, (entity_id,))

        result = cursor.fetchone()

        if result:
            pubchem_ids = result[0].replace('{', '').replace('}', '').split(', ')
            query = "SELECT commonName FROM molecules WHERE pubchemID IN ({})".format(','.join('?' for _ in pubchem_ids))
            cursor.execute(query, pubchem_ids)

            common_names = [row[0] for row in cursor.fetchall()]
            return common_names
        else:
            return []  # TODO: Change return
    finally:
        cursor.close()
        db.close()


@app.route('/api/common-molecules/<alias_1>/<alias_2>', methods=['GET'])
def get_common_elements_alias_route(alias_1, alias_2):
    common_elements = get_common_elements_by_alias(alias_1, alias_2)
    return jsonify({'common_elements': common_elements})


def get_common_elements_by_alias(alias_1, alias_2):
    common_names1 = set(get_common_names_by_alias(alias_1))
    common_names2 = set(get_common_names_by_alias(alias_2))
    common_elements = list(common_names1.intersection(common_names2))
    return common_elements


def get_common_names_by_alias(alias):
    db = get_db()
    cursor = db.cursor()

    try:
        query = "SELECT molecules FROM flavordb WHERE alias = ?"
        cursor.execute(query, (alias,))

        result = cursor.fetchone()

        if result:
            pubchem_ids = result[0].replace('{', '').replace('}', '').split(', ')
            query = "SELECT commonName FROM molecules WHERE pubchemID IN ({})".format(','.join('?' for _ in pubchem_ids))
            cursor.execute(query, pubchem_ids)

            common_names = [row[0] for row in cursor.fetchall()]
            return common_names
        else:
            return []  # TODO: Change return
    finally:
        cursor.close()
        db.close()


@app.route('/api/wikipedia/<path:pageTitle>')
def wikipedia_proxy(pageTitle):
    wikipedia_api_url = f'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&titles={pageTitle}'

    try:
        response = requests.get(wikipedia_api_url)
        data = response.json()

        return jsonify(data)
    except Exception as e:
        print(f'Error fetching Wikipedia data: {e}')
        return jsonify({'error': 'Internal Server Error'}), 500


if __name__ == '__main__':
    app.run(debug=True)