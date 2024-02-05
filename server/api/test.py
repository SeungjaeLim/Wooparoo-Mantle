# api/test.py
from flask_restx import Namespace, Resource
from db.mongodb import get_db

test_api = Namespace('test', description='Test APIs')

@test_api.route('/test_server')
class TestServer(Resource):
    def get(self):
        return {"success": True, "message": "Server is running"}

@test_api.route('/test_db_connection')
class TestDBConnection(Resource):
    def get(self):
        db = get_db()
        try:
            # Fetch the list of collections in the database
            collections = db.list_collection_names()
            return {
                "success": True, 
                "message": "Successfully connected to the database.", 
                "collections": collections
            }
        except Exception as e:
            return {"success": False, "message": f"Failed to connect to DB: {e}"}
