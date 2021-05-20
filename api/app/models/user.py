from flask_login import UserMixin

from app import db


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    recipes = db.relationship("Recipe", backref="owner", lazy=True)
    ingredients = db.relationship("Ingredient", backref="owner", lazy=True)

    def __repr__(self):
        return f"{self.username}"
