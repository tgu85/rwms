from app import db, ma


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_name = db.Column(db.String(50), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    ingredients = db.relationship("Ingredient", backref="recipe_name", lazy=True)

    def __repr__(self):
        return f"{self.recipe_name}"


class RecipeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Recipe
