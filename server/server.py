import sqlite3

import requests
from flask import Flask, jsonify, g, send_file, redirect, request
from flask_cors import CORS

app = Flask(__name__)
app.config['DATABASE'] = 'data/food_data.db'
CORS(app)  # TODO: Important, react can't access routes without this apparently


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


@app.route('/api/flavordb', methods=['GET'])
def get_all_ingredients():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM flavordb")
    rows = cursor.fetchall()
    data = [dict(zip(['index', 'entityID', 'alias', 'synonyms', 'scientificName', 'category', 'molecules'], row)) for
            row in rows]
    cursor.close()
    return jsonify({'data': data})


@app.route('/api/flavordb/<alias>', methods=['GET'])
def get_flavor_by_alias(alias):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM flavordb WHERE alias = ?", (alias,))
    row = cursor.fetchone()
    data = dict(zip(['index', 'entityID', 'alias', 'synonyms', 'scientificName', 'category', 'molecules'],
                    row)) if row else None
    cursor.close()
    return jsonify({'data': data})


@app.route('/api/flavordb/<int:entity_id>', methods=['GET'])
def get_flavor_by_id(entity_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM flavordb WHERE entityID = ?", (entity_id,))
    row = cursor.fetchone()
    data = dict(zip(['index', 'entityID', 'alias', 'synonyms', 'scientificName', 'category', 'molecules'],
                    row)) if row else None
    cursor.close()
    return jsonify({'data': data})


@app.route('/api/flavordb/ingredient-molecules/<int:entity_id>', methods=['GET'])
def get_all_molecules_of_ingredient(entity_id):
    # Connect to SQLite database (replace 'your_database.db' with the actual name of your SQLite database file)
    conn = sqlite3.connect('data/food_data.db')
    cursor = conn.cursor()

    # Get 'molecules' column for the given entity_id
    cursor.execute("SELECT molecules FROM flavordb WHERE entityID = ?", (entity_id,))
    result = cursor.fetchone()

    if result is None:
        # If no record is found for the given entity_id, return an error response
        return jsonify({"error": "Entity not found"}), 404

    molecules_str = result[0]

    try:
        # Convert the string representation to a list
        molecules_list = eval(molecules_str)
        # Ensure molecules_list is a list and not a set
        if not isinstance(molecules_list, list):
            molecules_list = list(molecules_list)
    except Exception as e:
        # Handle potential evaluation errors
        return jsonify({"error": f"Error processing 'molecules': {str(e)}"}), 500

    # Fetch details for each molecule using pubchemID from the 'molecules' table
    molecules_data = []
    for pubchem_id in molecules_list:
        cursor.execute("SELECT * FROM molecules WHERE pubchemID = ?", (pubchem_id,))
        molecule_data = cursor.fetchone()
        if molecule_data:
            # Convert the flavorProfile set to a list
            flavor_profile = eval(molecule_data[3])
            if not isinstance(flavor_profile, list):
                flavor_profile = list(flavor_profile)

            molecules_data.append({
                "pubchemID": molecule_data[1],
                "commonName": molecule_data[2],
                "flavorProfile": flavor_profile
            })

    # Close the database connection
    conn.close()

    # Convert the response to JSON
    response_json = {"entityID": entity_id, "molecules": molecules_data}
    return jsonify(response_json)


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
    return jsonify({'data': aliases})


@app.route('/api/molecules/<int:pubchem_id>', methods=['GET'])
def get_molecule_by_id(pubchem_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM molecules WHERE pubchemID = ?", (pubchem_id,))
    row = cursor.fetchone()
    data = dict(zip(['index', 'pubchemID', 'commonName', 'flavorProfile'], row)) if row else None
    cursor.close()
    return jsonify({'data': data})


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
            query = "SELECT commonName FROM molecules WHERE pubchemID IN ({})".format(
                ','.join('?' for _ in pubchem_ids))
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
            query = "SELECT commonName FROM molecules WHERE pubchemID IN ({})".format(
                ','.join('?' for _ in pubchem_ids))
            cursor.execute(query, pubchem_ids)

            common_names = [row[0] for row in cursor.fetchall()]
            return common_names
        else:
            return []  # TODO: Change return
    finally:
        cursor.close()
        db.close()


@app.route('/api/common-data/<int:entity_id1>/<int:entity_id2>', methods=['GET'])
def get_common_data_id_route(entity_id1, entity_id2):
    common_data = get_common_data_by_ids(entity_id1, entity_id2)

    # Convert common_data to a list if it's not already
    if not isinstance(common_data, list):
        common_data = [common_data]

    return jsonify({'common_data': common_data})


def get_common_data_by_ids(entity_id1, entity_id2):
    db = get_db()
    cursor = db.cursor()

    try:
        # Fetch the PubChem IDs for each entity
        query = "SELECT molecules FROM flavordb WHERE entityID = ? OR entityID = ?"
        cursor.execute(query, (entity_id1, entity_id2))
        results = cursor.fetchall()

        if len(results) == 2:
            pubchem_ids1 = set(int(x) for x in results[0][0].replace('{', '').replace('}', '').split(', '))
            pubchem_ids2 = set(int(x) for x in results[1][0].replace('{', '').replace('}', '').split(', '))

            # Find the common PubChem IDs
            common_pubchem_ids = list(pubchem_ids1.intersection(pubchem_ids2))

            if common_pubchem_ids:
                # Fetch the full data from 'molecules' for the common PubChem IDs
                query = "SELECT * FROM molecules WHERE pubchemID IN ({})".format(
                    ','.join('?' for _ in common_pubchem_ids))
                cursor.execute(query, common_pubchem_ids)

                # Fetch the column names to use as keys in the resulting dictionaries
                column_names = [description[0] for description in cursor.description]

                # Convert flavorProfile values to arrays
                common_data = [dict(zip(column_names, row)) for row in cursor.fetchall()]
                for item in common_data:
                    item['flavorProfile'] = item['flavorProfile'].replace('{', '').replace('}', '').split(', ')

                return common_data
            else:
                return []  # No common data
        else:
            return []  # One or both entities not found
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


'''
    - PUBCHEM Stuff
'''


@app.route('/api/get_molecule_info/<int:pubchem_id>', methods=['GET'])
def get_molecule_info(pubchem_id):
    try:
        # Make a request to the PubChem PUG REST API
        url = f'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{pubchem_id}/json'
        response = requests.get(url)

        if response.status_code == 200:
            # Parse the response JSON and return all available information
            result = response.json()['PC_Compounds'][0]
            properties = result.get('props', [])

            # Extract all properties from the 'props' field
            molecule_info = {
                'PubChemID': pubchem_id,
                'Properties': {prop['urn']['label']: prop['value'] for prop in properties}
            }

            # Print the contents of the response for testing purposes
            print("Molecule Info:", molecule_info)

            return jsonify({'molecule_info': molecule_info})
        else:
            # Handle error responses
            return jsonify({'error': f'Error retrieving data for PubChem ID {pubchem_id}'})

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/api/get_molecule_image/<int:pubchem_id>', methods=['GET'])
def get_molecule_image(pubchem_id):
    pubchem_url = f'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{pubchem_id}/PNG'
    return redirect(pubchem_url)


# @app.route('/api/get_molecule_image/<int:pubchem_id>', methods=['GET'])
# def get_molecule_image(pubchem_id):
#     try:
#         response = requests.get(f'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{pubchem_id}/PNG')
#         response.raise_for_status()
#
#         # Set the desired file name (e.g., molecule.png)
#         filename = f'molecule_{pubchem_id}.png'
#
#         return send_file(response.raw, mimetype='image/png', as_attachment=True, download_name=filename)
#     except requests.exceptions.RequestException as e:
#         return str(e), 500


@app.route('/api/get_ingredients/<entity_id>', methods=['GET'])
def get_ingredients(entity_id):
    # Use get_db() to get the database connection
    with get_db() as conn:
        # Query the database to get molecules associated with the entity_id
        cur = conn.cursor()
        cur.execute("SELECT alias, molecules FROM flavordb WHERE entityID = ?", (entity_id,))
        result = cur.fetchone()

        if result is None:
            return jsonify({'error': 'Entity ID not found'}), 404

        alias_entity_id, molecules_entity_id = result  # Assuming molecules are stored as a string and need to be converted to a list
        molecules_entity_id = set(eval(molecules_entity_id))

        # Fetch all rows from flavordb
        cur.execute("SELECT alias, molecules FROM flavordb")
        all_rows = cur.fetchall()

        # Create a dictionary to store shared molecule count
        shared_molecule_count_dict = {}

        # Compare molecules of the entity_id with all other rows
        for alias_row, molecules_row_str in all_rows:
            if alias_row == alias_entity_id:
                continue  # Skip the current row
            molecules_row = set(eval(molecules_row_str))  # Assuming molecules are stored as a string and need to be converted to a list
            shared_molecule_count = len(molecules_entity_id & molecules_row)
            shared_molecule_count_dict[alias_row] = shared_molecule_count

        return jsonify({'shared_molecule_count': shared_molecule_count_dict})



if __name__ == '__main__':
    app.run(debug=True)
