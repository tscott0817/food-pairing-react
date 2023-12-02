import sqlite3

from flask import Flask, jsonify, g
from flask_cors import CORS

app = Flask(__name__)
app.config['DATABASE'] = 'data/food_data.db'
CORS(app)  # TODO: Important, react can't access routes without this apparently


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



@app.route('/api/common-elements/<int:entity_id1>/<int:entity_id2>', methods=['GET'])
def get_common_elements_route(entity_id1, entity_id2):
    common_elements = get_common_elements(entity_id1, entity_id2)
    return jsonify({'common_elements': common_elements})


def get_common_elements(entity_id1, entity_id2):
    common_names1 = set(get_common_names(entity_id1))
    common_names2 = set(get_common_names(entity_id2))
    common_elements = list(common_names1.intersection(common_names2))
    return common_elements


def get_common_names(entity_id):
    # Establish a connection to the SQLite database
    with get_db() as db:
        # Use placeholders to prevent SQL injection
        query = "SELECT molecules FROM flavordb WHERE entityID = ?"
        cursor = db.cursor()
        cursor.execute(query, (entity_id,))

        result = cursor.fetchone()

        if result:
            pubchem_ids = result[0].split(',')
            query = "SELECT commonName FROM molecules WHERE pubchemID IN ({})".format(','.join('?' for _ in pubchem_ids))
            cursor.execute(query, pubchem_ids)

            common_names = [row[0] for row in cursor.fetchall()]
            return common_names
        else:
            return None



if __name__ == '__main__':
    app.run(debug=True)