'''
    - Must create DB first: "C:\Program Files\PostgreSQL\15\bin\createdb.exe" -U postgres food_data
'''
import pandas as pd
from sqlalchemy import create_engine, Text, TypeDecorator, ARRAY
import re

class ArrayType(TypeDecorator):
    impl = Text

    def process_bind_param(self, value, dialect):
        if value is not None:
            value = "{" + ",".join(map(str, value)) + "}"
        return value

def parse_set(value):
    # Use regular expression to extract elements from the set-like string
    elements = re.findall(r'\w+', value)
    return set(elements)

# Read CSV files
flavordb_df = pd.read_csv('flavordb.csv')
molecules_df = pd.read_csv('molecules.csv')

# Replace NaN or None values with a placeholder
flavordb_df = flavordb_df.fillna('na')
molecules_df = molecules_df.fillna('na')

# Apply the parse_set function to convert set-like strings to actual sets
flavordb_df['synonyms'] = flavordb_df['synonyms'].apply(parse_set)
flavordb_df['molecules'] = flavordb_df['molecules'].apply(parse_set)

molecules_df['flavorProfile'] = molecules_df['flavorProfile'].apply(parse_set)

# PostgreSQL database connection
engine = create_engine('postgresql://postgres:Oblivion14@localhost/food_data')

# Write DataFrames to PostgreSQL tables with ARRAY data type for specific columns
flavordb_df.to_sql('flavordb', engine, index=False, if_exists='replace', dtype={'synonyms': ARRAY(Text()), 'molecules': ARRAY(Text())})
molecules_df.to_sql('molecules', engine, index=False, if_exists='replace', dtype={'flavorProfile': ARRAY(Text())})







'''
    - sqlite
'''
# import pandas as pd
# import sqlite3
#
# # Read CSV files
# flavordb_df = pd.read_csv('flavordb.csv')
# molecules_df = pd.read_csv('molecules.csv')
#
# # Replace NaN or None values with a placeholder
# flavordb_df = flavordb_df.fillna('na')
# molecules_df = molecules_df.fillna('na')
#
# # SQLite database connection
# conn = sqlite3.connect('food_data.db')  # Replace 'your_database_name' with the desired database name
#
# # Write dataframes to SQLite tables
# flavordb_df.to_sql('flavordb', conn, index=False, if_exists='replace')
# molecules_df.to_sql('molecules', conn, index=False, if_exists='replace')
#
# # Commit and close the connection
# conn.commit()
# conn.close()