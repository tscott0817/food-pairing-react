from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import sqlite3
import ast

app = Flask(__name__)
CORS(app)  # TODO: Important, react can't access routes without this

# Load CSV files
flavordb_df = pd.read_csv('data/flavordb.csv')
molecules_df = pd.read_csv('data/molecules.csv')

foodDB = 'data/food_data.db'
conn = sqlite3.connect(foodDB)

# # Convert the 'molecules' column in flavordb_df from string to set
# flavordb_df['molecules'] = flavordb_df['molecules'].apply(eval)

# Convert sets to lists in DataFrame instead of set (need list for JSON serialization, set does not work)
# flavordb_df['molecules'] = flavordb_df['molecules'].apply(list)

# TODO: The other 2 only work for one or the other, but this works for both????
# Convert the 'molecules' column in flavordb_df from string to list
flavordb_df['molecules'] = flavordb_df['molecules'].apply(lambda x: [int(i) for i in x.replace('{', '').replace('}', '').replace(' ', '').split(',')])  # TODO: See Python is 'easy'

# TODO: Why does this work but my previous line doesn't?? Some dumbass bullshit Python nonsense that's why.
# Convert the 'molecules' column in flavordb_df from string to list
# flavordb_df['molecules'] = flavordb_df['molecules'].apply(ast.literal_eval)  # TODO: Apparently this automatically removes anything not a literal


@app.route('/api/flavordb', methods=['GET'])
def get_flavordb():
    return jsonify({'data': flavordb_df.to_dict(orient='records')})


@app.route('/api/molecules', methods=['GET'])
def get_molecules():
    return jsonify({'data': molecules_df.to_dict(orient='records')})


@app.route('/api/flavordb/<int:entity_id>', methods=['GET'])
def get_flavor_by_id(entity_id):
    row = flavordb_df[flavordb_df['entity id'] == entity_id].to_dict(orient='records')
    return jsonify({'data': row[0] if row else None})



# @app.route('/api/flavordb/<alias>', methods=['GET'])
# def get_flavor_by_alias(alias):
#     row = flavordb_df[flavordb_df['alias'] == alias].to_dict(orient='records')
#     return jsonify({'data': row[0] if row else None})

@app.route('/api/flavordb/<alias>', methods=['GET'])
def get_flavor_by_alias(alias):
    row = flavordb_df[flavordb_df['alias'] == alias].to_dict(orient='records')
    return jsonify({'data': row} if row else {'data': []})  # TODO: Not sure if I like [] or None return


@app.route('/api/molecules/<int:pubchem_id>', methods=['GET'])
def get_molecule_by_id(pubchem_id):
    row = molecules_df[molecules_df['pubchem id'] == pubchem_id].to_dict(orient='records')
    return jsonify({'data': row[0] if row else None})


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
    row = flavordb_df[flavordb_df['entity id'] == entity_id]

    if not row.empty:
        pubchem_ids = row['molecules'].values[0]
        common_names = molecules_df[molecules_df['pubchem id'].isin(pubchem_ids)]['common name'].tolist()

        return common_names
    else:
        return None


if __name__ == '__main__':
    app.run(debug=True)
