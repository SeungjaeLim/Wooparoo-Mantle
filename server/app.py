# app.py
from flask import Flask
from flask_restx import Api
from api.test import test_api
from api.guess import guess_api
from api.quiz import quiz_api

app = Flask(__name__)
api = Api(app, version='1.0', title='API 문서', description='Swagger 문서', doc="/api-docs")

api.add_namespace(test_api, path='/test')
api.add_namespace(guess_api, path='/guess')
api.add_namespace(quiz_api, path='/quiz')

if __name__ == '__main__':
    app.run(debug=True)
