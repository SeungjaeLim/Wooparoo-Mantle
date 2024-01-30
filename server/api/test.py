# api/test.py
from flask import Blueprint, jsonify
from db.mongodb import get_db

test_api = Blueprint('test_api', __name__)

@test_api.route('/test_server', methods=['GET'])
def test_server():
    return jsonify({"success": True, "message": "Server is running"})

@test_api.route('/test_db_connection', methods=['GET'])
def test_db_connection():
    db = get_db()
    try:
        count = db.wooinfo.count_documents({})
        return jsonify({"success": True, "message": f"Connected to DB. Document count in 'wooinfo': {count}"})
    except Exception as e:
        return jsonify({"success": False, "message": f"Failed to connect to DB: {e}"})
