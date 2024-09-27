from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Exhibit

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///museum.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/exhibits', methods=['GET'])
def get_exhibits():
    exhibits = Exhibit.query.all()
    return jsonify([exhibit.to_dict() for exhibit in exhibits])

@app.route('/exhibits', methods=['POST'])
def add_exhibit():
    data = request.get_json()
    new_exhibit = Exhibit(name=data['name'], description=data['description'], image_url=data.get('image_url'))
    db.session.add(new_exhibit)
    db.session.commit()
    return jsonify(new_exhibit.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)
