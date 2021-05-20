from app import db, ma


class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ingredient = db.Column(db.String(30), unique=False, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    recipes_id = db.Column(db.String(50), db.ForeignKey("recipe.recipe_name"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return f"{self.ingredient}, {self.amount},{self.unit}"


class IngredientSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Ingredient
