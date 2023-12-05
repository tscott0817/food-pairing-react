# for basic data science
import pandas as pd
import numpy as np
# import matplotlib.pyplot as plt
import math
from itertools import combinations

# for downloading files off the internet
import urllib.request
import urllib.error  # TODO: Fix this in code
import json
import time


# # for network graphs
# from colour import Color
# from matplotlib.collections import LineCollection
# import networkx as nx
# import mpld3


def main():
    # Load the CSV files
    flavordb_df = pd.read_csv('data/flavordb.csv')
    molecules_df = pd.read_csv('data/molecules.csv')

    # Convert the 'molecules' column in flavordb_df from string to set
    flavordb_df['molecules'] = flavordb_df['molecules'].apply(eval)  # Important

    # Convert the 'flavorProfile' column in molecules_df from string to set
    molecules_df['flavorProfile'] = molecules_df['flavorProfile'].apply(eval)  # Important

    # Get the entityID-flavorProfile mapping
    entity_flavor_mapping = get_entity_flavor_mapping(flavordb_df, molecules_df)

    # Find the two items with the most shared flavor profiles
    top_two_shared_items = find_top_two_shared_items(entity_flavor_mapping)

    # Print the results
    print("\n")
    print(f"The two items with the most shared flavor profiles are:")
    for item, shared_profiles in top_two_shared_items.items():
        print(f"Item {item}: {len(shared_profiles)} shared flavor profiles")
        print(f"All shared flavor profiles: {len(shared_profiles)}")
        print("\n")

    # get_molecules(flavordb_df, molecules_df)

    # # TODO: For comparisons.
    # running = True
    # while running:
    #
    #     print("\n")
    #     # Input entity_id1
    #     entity_id1_input = int(input("Enter first entityID: "))
    #     if entity_id1_input == 'q':
    #         running = False
    #     common_names1 = set(get_common_names(entity_id1_input, flavordb_df, molecules_df))
    #     total_molecules1 = len(common_names1)
    #     flavor_profile1 = set(entity_flavor_mapping.get(entity_id1_input, []))
    #
    #     # Input entity_id2
    #     entity_id2_input = int(input("Enter second entityID: "))
    #     if entity_id2_input == 'q':
    #         running = False
    #     common_names2 = set(get_common_names(entity_id2_input, flavordb_df, molecules_df))
    #     total_molecules2 = len(common_names2)
    #     flavor_profile2 = set(entity_flavor_mapping.get(entity_id2_input, []))
    #
    #     # Find common elements between the two sets
    #     common_elements = common_names1.intersection(common_names2)
    #
    #     # Get the match score with consideration for total molecules and penalization
    #     match_score = match_score_penalization(common_elements, total_molecules1, total_molecules2)
    #
    #     # Print the results
    #     print("\n")
    #     print(f"Molecules in Entity ID {entity_id1_input} ({get_alias(entity_id1_input, flavordb_df)}): {common_names1}")
    #     print(f"Total Molecules for Entity ID {entity_id1_input}: {total_molecules1}")
    #     print(f"Molecules in Entity ID {entity_id2_input} ({get_alias(entity_id2_input, flavordb_df)}): {common_names2}")
    #     print(f"Total Molecules for Entity ID {entity_id2_input}: {total_molecules2}")
    #     print("\n")
    #     print(f"{len(common_elements)} shared molecules for Entity ID's {entity_id1_input} and {entity_id2_input}: {common_elements}")
    #
    #     # TODO: Use this idea; maybe classify flavor profiles as 'strong' or 'weak' depending on how many in set
    #     #   - Example; if 5/6 are shared that set has 'strong' flavor profiles of those molecules, but if 5/134 of
    #     #       - the other set then that set has 'weak' flavor profiles of that molecule.
    #     print(f"That is {round(len(common_elements) / total_molecules1 * 100, 2)}% of ID {entity_id1_input} and {round(len(common_elements) / total_molecules2 * 100, 2)}% of ID {entity_id2_input}")
    #
    #     flavor_profile_one = classify_flavor_profile(round(len(common_elements) / total_molecules1 * 100, 2))
    #     flavor_profile_two = classify_flavor_profile(round(len(common_elements) / total_molecules2 * 100, 2))
    #     print(f"{get_alias(entity_id1_input, flavordb_df)} has a {flavor_profile_one} flavor profile of the shared molecules")
    #     print(f"{get_alias(entity_id2_input, flavordb_df)} has a {flavor_profile_two} flavor profile of the shared molecules")
    #     print(f"Match Score: {match_score[0]} {match_score[1]}")


    # TODO: This
    #  - Best pair: (162, 234) | 188 molecules in common
    # print("\n")
    # best_pair = find_best_molecule_pair(flavordb_df, molecules_df)
    # print(f"Best pair: {best_pair[0]} | {best_pair[1]} molecules in common")



# TODO: Single search
def get_molecules(flavordb_df, molecules_df):
    # Input entity_id
    entity_id_input = int(input("Enter entity_id: "))

    # Get common names and alias
    common_names = get_common_names(entity_id_input, flavordb_df, molecules_df)
    alias = get_alias(entity_id_input, flavordb_df)

    if common_names is not None:
        print(f"Molecules in Entity ID {entity_id_input} ({alias}):")
        for common_name in common_names:
            print(common_name)
    else:
        print(f"No data found for Entity ID {entity_id_input}")


def get_alias(entity_id, flavordb_df):
    row = flavordb_df[flavordb_df['entityID'] == entity_id]

    if not row.empty:
        alias = row['alias'].values[0]
        return alias
    else:
        return None


# TODO: Comparison
# Function to get common names for a given entity_id
def get_common_names(entity_id, flavordb_df, molecules_df):
    row = flavordb_df[flavordb_df['entityID'] == entity_id]

    if not row.empty:
        pubchem_ids = row['molecules'].values[0]
        common_names = molecules_df[molecules_df['pubchemID'].isin(pubchem_ids)]['commonName'].tolist()

        return common_names
    else:
        return None


def classify_flavor_profile(shared_percentage, low_threshold=50, high_threshold=80):
    if shared_percentage >= high_threshold:
        return "Strong"
    elif shared_percentage >= low_threshold:
        return "Medium"
    else:
        return "Weak"


def find_best_molecule_pair(flavordb_df, molecules_df):
    max_shared = 0
    best_pair = None

    # Iterate through all combinations of entity IDs
    for entity_id1, entity_id2 in combinations(flavordb_df['entityID'], 2):
        common_names1 = set(get_common_names(entity_id1, flavordb_df, molecules_df))
        common_names2 = set(get_common_names(entity_id2, flavordb_df, molecules_df))

        # Find the number of shared molecules
        shared_molecules = len(common_names1.intersection(common_names2))

        # Update the best pair if the current pair has more shared molecules
        if shared_molecules > max_shared:
            max_shared = shared_molecules
            best_pair = (entity_id1, entity_id2)

    return best_pair, max_shared


def match_score_threshold(common_elements):
    # Define the threshold for a good match
    good_match_threshold = 5  # Adjust this value based on your preference

    # Function to get the match score
    if len(common_elements) >= good_match_threshold:
        return "Good Match"
    else:
        return "Bad Match"


# Function to get the match score with consideration for total molecules and penalization
def match_score_penalization(common_elements, total_molecules1, total_molecules2):
    # Calculate the percentage of common molecules relative to the smaller set
    min_total_molecules = min(total_molecules1, total_molecules2)
    common_percentage = len(common_elements) / min_total_molecules * 100

    # Calculate the penalization factor based on the ratio of total molecules
    penalization_factor = min(total_molecules1, total_molecules2) / max(total_molecules1, total_molecules2)

    # Adjusted common percentage with penalization
    adjusted_common_percentage = common_percentage * penalization_factor

    # Define the threshold for a good match percentage
    good_match_percentage = 20  # Adjust this value based on your preference

    if adjusted_common_percentage >= good_match_percentage:
        return "Good Match", adjusted_common_percentage
    else:
        return "Bad Match", adjusted_common_percentage


# Function to get common names for a given entity_id
def get_common_names(entity_id, flavordb_df, molecules_df):
    row = flavordb_df[flavordb_df['entityID'] == entity_id]

    if not row.empty:
        pubchem_ids = row['molecules'].values[0]
        common_names = molecules_df[molecules_df['pubchemID'].isin(pubchem_ids)]['commonName'].tolist()

        return common_names
    else:
        return None


def compare():
    # Load the CSV files
    flavordb_df = pd.read_csv('flavordb.csv')
    molecules_df = pd.read_csv('molecules.csv')

    # Convert the 'molecules' column in flavordb_df from string to set
    flavordb_df['molecules'] = flavordb_df['molecules'].apply(eval)

    # Function to get common names for a given entity_id
    def get_common_names(entity_id):
        row = flavordb_df[flavordb_df['entityID'] == entity_id]

        if not row.empty:
            pubchem_ids = row['molecules'].values[0]
            common_names = molecules_df[molecules_df['pubchemID'].isin(pubchem_ids)]['commonName'].tolist()

            return common_names
        else:
            return None

    # Input entity_id1
    entity_id1_input = int(input("Enter first entity_id: "))
    common_names1 = set(get_common_names(entity_id1_input))

    # Input entity_id2
    entity_id2_input = int(input("Enter second entity_id: "))
    common_names2 = set(get_common_names(entity_id2_input))

    # Find common elements between the two sets
    common_elements = common_names1.intersection(common_names2)

    # Print the results
    print(f"Common Names for Entity ID {entity_id1_input}: {common_names1}")
    print(f"Common Names for Entity ID {entity_id2_input}: {common_names2}")
    print(f"Common Elements: {common_elements}")



def get_entity_flavor_mapping(flavordb_df, molecules_df):
    entity_flavor_mapping = {}

    for index, row in molecules_df.iterrows():
        pubchem_id = row['pubchemID']
        flavor_profile = row['flavorProfile']

        entities = flavordb_df[flavordb_df['molecules'].applay(lambda x: pubchem_id in x)]['entityID'].tolist()

        for entity in entities:
            if entity not in entity_flavor_mapping:
                entity_flavor_mapping[entity] = set()

            entity_flavor_mapping[entity].update(flavor_profile)

    return entity_flavor_mapping

def find_top_two_shared_items(entity_flavor_mapping):
    max_shared_count = 0
    top_two_shared_items = {}

    # Iterate through all combinations of entity IDs
    for entity_id1, entity_id2 in combinations(entity_flavor_mapping.keys(), 2):
        common_profiles = entity_flavor_mapping[entity_id1].intersection(entity_flavor_mapping[entity_id2])

        # Update the top two shared items if the current pair has more shared profiles
        shared_count = len(common_profiles)
        if shared_count > max_shared_count:
            max_shared_count = shared_count
            top_two_shared_items = {entity_id1: entity_flavor_mapping[entity_id1],
                                    entity_id2: entity_flavor_mapping[entity_id2]}

    return top_two_shared_items

if __name__ == '__main__':
    main()