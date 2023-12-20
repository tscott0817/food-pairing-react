from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

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

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
