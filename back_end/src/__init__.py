from flask import Flask
from flask_cors import CORS


def create_server():
    server = Flask(__name__)
    CORS(server)

    from src.controllers import students, courses
    server.register_blueprint(students.students_blueprint)
    server.register_blueprint(courses.courses_blueprint)

    return server
