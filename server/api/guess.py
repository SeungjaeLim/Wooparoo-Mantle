# api/guess.py
from flask_restx import Namespace, Resource, reqparse
from db.mongodb import get_db
from datetime import datetime

guess_api = Namespace('guess', description='Guess APIs')

@guess_api.route('/guess')
class Guess(Resource):
    @guess_api.expect(reqparse.RequestParser().add_argument('guess', type=str, required=True, location='json'))
    def post(self):
        db = get_db()
        parser = reqparse.RequestParser()
        parser.add_argument('guess', type=str, location='json')
        args = parser.parse_args()
        guess = args['guess']

        today = datetime.now()
        start_of_day = datetime(today.year, today.month, today.day)

        quiz = db.quiz.find_one({"date": start_of_day})

        if quiz is None or 'answer' not in quiz:
            return {"success": False, "message": "No quiz found for today or quiz format is incorrect."}

        is_correct = guess.lower() == quiz['answer'].lower()
        db.log.insert_one({
            "ip": reqparse.request.remote_addr,
            "guess": guess,
            "correct": is_correct,
            "timestamp": datetime.now()
        })

        # Fetch Wooparoo information without the _id field
        wooparoo_info = db.wooparoo.find_one({"name": guess}, {'_id': 0})

        # Fetch similarity information without the _id field
        guessed_wooparoo_similarity = db.similarity.find_one({"wooparooname": guess}, {'_id': 0})

        return {
            "result": "correct" if is_correct else "incorrect",
            "answer_info": wooparoo_info,
            "similarity_rankings": guessed_wooparoo_similarity,
            "message": "Congratulations! Correct guess." if is_correct else "Sorry, that's incorrect."
        }
