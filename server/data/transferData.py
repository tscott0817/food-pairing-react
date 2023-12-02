import pandas as pd
import sqlite3

# Read CSV files
flavordb_df = pd.read_csv('flavordb.csv')
molecules_df = pd.read_csv('molecules.csv')

# Replace NaN or None values with a placeholder
flavordb_df = flavordb_df.fillna('na')
molecules_df = molecules_df.fillna('na')

# SQLite database connection
conn = sqlite3.connect('food_data.db')  # Replace 'your_database_name' with the desired database name

# Write dataframes to SQLite tables
flavordb_df.to_sql('flavordb', conn, index=False, if_exists='replace')
molecules_df.to_sql('molecules', conn, index=False, if_exists='replace')

# Commit and close the connection
conn.commit()
conn.close()