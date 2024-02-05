# loader.py
import pandas as pd
from pymongo import MongoClient

# MongoDB connection
client = MongoClient("mongodb://localhost:27017")
db = client.woomantle
wooparoo_collection = db.wooparoo

# Load CSV data into pandas DataFrame
csv_file_path = "../assets/wooparoo.csv"  # Replace with your CSV file path
wooparoo_df = pd.read_csv(csv_file_path)

# Iterate over the DataFrame and update/insert documents
for index, row in wooparoo_df.iterrows():
    document = row.to_dict()
    query = {"name": document["name"]}  # Assuming 'name' is a unique identifier
    update = {"$set": document}
    result = wooparoo_collection.update_one(query, update, upsert=True)
    if result.matched_count:
        print(f"Updated Wooparoo '{document['name']}'")
    elif result.upserted_id:
        print(f"Inserted new Wooparoo '{document['name']}' with ID: {result.upserted_id}")
    else:
        print(f"No changes made for Wooparoo '{document['name']}'")

print("Wooparoo data loaded into MongoDB")
