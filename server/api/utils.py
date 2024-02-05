# api/utils.py
from datetime import datetime
from db.mongodb import get_db
from .similarity import calculate_similarity

def create_or_fetch_quiz():
    db = get_db()
    today = datetime.now()
    start_of_day = datetime(today.year, today.month, today.day)

    quiz = db.quiz.find_one({"date": start_of_day})
    print(calculate_similarity())
    if not quiz:
        # Fetch a random Wooparoo from the wooparoo collection
        random_wooparoo_list = list(db.wooparoo.aggregate([{"$sample": {"size": 1}}]))
        if random_wooparoo_list:
            random_wooparoo = random_wooparoo_list[0]
            wooparoo_name = random_wooparoo['name']  # Assuming 'name' field exists

            # Logic to create a new quiz
            new_quiz = {
                "quiz_number": db.quiz.count_documents({}) + 1,
                "date": start_of_day,
                "answer": wooparoo_name  # Use the randomly selected Wooparoo name
            }
            db.quiz.insert_one(new_quiz)
            return new_quiz
        else:
            # Handle the case where no Wooparoo is found
            return {"error": "No Wooparoo found in the database."}

    return quiz
