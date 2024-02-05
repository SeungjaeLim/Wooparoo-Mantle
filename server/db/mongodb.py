# db/mongodb.py
from pymongo import MongoClient

def get_db():
    client = MongoClient("mongodb://localhost:27017")
    return client.get_database("woomantle")
