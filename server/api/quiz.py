# api/quiz.py
from flask_restx import Namespace, Resource
from api.utils import create_or_fetch_quiz

quiz_api = Namespace('quiz', description='Quiz APIs')

@quiz_api.route('/daily_quiz')
class DailyQuiz(Resource):
    def get(self):
        # Fetch or create the quiz for the day
        quiz = create_or_fetch_quiz()
        return {"quiz_number": quiz["quiz_number"], "date": str(quiz["date"]), "answer": quiz["answer"]}
