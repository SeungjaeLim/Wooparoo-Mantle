# api/guess.py
from flask import Blueprint, request, jsonify
from db.mongodb import get_db
from datetime import datetime

guess_api = Blueprint('guess_api', __name__)

@guess_api.route('/guess', methods=['POST'])
def submit_guess():
    db = get_db()
    guess = request.json.get('guess')
    today = datetime.now().date()
    quiz = db.quizzes.find_one({"date": today})

    is_correct = guess.lower() == quiz['answer'].lower()
    db.log.insert_one({
        "ip": request.remote_addr,
        "guess": guess,
        "correct": is_correct,
        "timestamp": datetime.now()
    })

    return jsonify({
        "result": "correct" if is_correct else "incorrect",
        "message": "Congratulations! Correct guess." if is_correct else "Sorry, that's incorrect."
    })
