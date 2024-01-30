# api/__init__.py
from flask import Blueprint
from .guess import guess_api
from .test import test_api

api_blueprint = Blueprint('api_blueprint', __name__)

# Register the individual blueprints
api_blueprint.register_blueprint(guess_api, url_prefix='/guess')
api_blueprint.register_blueprint(test_api, url_prefix='/test')
