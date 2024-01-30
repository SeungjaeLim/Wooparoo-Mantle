# api/utils.py
from datetime import datetime
from db.mongodb import get_db

def create_or_fetch_quiz():
    db = get_db()
    today = datetime.now().date()
    quiz = db.quizzes.find_one({"date": today})

    if not quiz:
        # Logic to create a new quiz
        new_quiz = {
            "quiz_number": db.quizzes.count_documents({}) + 1,
            "date": today,
            "answer": "WooparooName"  # Replace with actual logic to select a Wooparoo
        }
        db.quizzes.insert_one(new_quiz)
        return new_quiz
    return quiz
