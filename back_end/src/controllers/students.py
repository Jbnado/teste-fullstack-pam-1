from flask import Blueprint, request
from tinydb import TinyDB, Query
import uuid

students_db = TinyDB('src/db/students.json')

students_blueprint = Blueprint('students', __name__)


@students_blueprint.get('/students')
def getAllStudents():
    try:
        students = students_db.all()
    except:
        return {'message': 'An error occurred'}
    return students


@students_blueprint.get('/students/<id>')
def getStudent(id):
    StudentDB = Query()
    try:
        student = students_db.search(StudentDB.id == id)[0]
        return student
    except IndexError:
        return {'message': 'Student doesn\'t exist'}


@students_blueprint.post('/students')
def addStudent():
    try:
        student = {
            **request.get_json(),
            'id': uuid.uuid4().hex,
        }
        students_db.insert(student)
        return student
    except:
        return {'message': 'An error occurred while adding the student'}


@students_blueprint.put('/students/<id>')
def updateStudent(id):
    Student = Query()
    try:
        modifiedStudent = request.get_json()
        students_db.update(modifiedStudent, Student.id == id)
        return getStudent(id)
    except:
        return {'message': 'An error occurred while updating the student'}


@students_blueprint.delete('/students/<id>')
def deleteStudent(id):
    Student = Query()
    if students_db.remove(Student.id == id):
        return {'message': 'Student deleted'}

    return {'message': 'Student not found'}
