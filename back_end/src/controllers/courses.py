from flask import Blueprint, request
from tinydb import TinyDB, Query
import uuid

courses_db = TinyDB('src/db/courses.json')

courses_blueprint = Blueprint('courses', __name__)


@courses_blueprint.get('/courses')
def getAllCourses():
    try:
        courses = courses_db.all()
    except:
        return {'message': 'An error occurred'}
    return courses


@courses_blueprint.get('/courses/<id>')
def getCourse(id):
    CourseDB = Query()
    try:
        course = courses_db.search(CourseDB.id == id)[0]
        return course
    except IndexError:
        return {'message': 'Course doesn\'t exist'}


@courses_blueprint.post('/courses')
def addCourse():
    try:
        course = {
            'id': uuid.uuid4().hex,
            **request.get_json()
        }
        courses_db.insert(course)
        return course
    except:
        return {'message': 'An error occurred while adding the course'}


@ courses_blueprint.put('/courses/<id>')
def updateCourse(id):
    Course = Query()
    try:
        modifiedCourse = request.get_json()
        courses_db.update(modifiedCourse, Course.id == id)
        return getCourse(id)
    except:
        return {'message': 'An error occurred while updating the course'}


@ courses_blueprint.delete('/courses/<id>')
def deleteCourse(id):
    Course = Query()
    if courses_db.remove(Course.id == id):
        return {'message': 'Course deleted'}

    return {'message': 'Course not found'}
