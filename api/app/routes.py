import json
import random

from flask import *
from flask_login import login_user, logout_user, current_user

from app import app, bcrypt, db, login_manager
from app.models.ingredient import Ingredient, IngredientSchema
from app.models.recipe import Recipe, RecipeSchema
from app.models.user import User


@app.route("/register", methods=["POST"])
def register():
    get_register_form = request.get_json()
    print(get_register_form)
    username = str(get_register_form["username"]).lower()
    password = str(get_register_form["password"])
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    if User.query.filter_by(username=username).first():
        response = {"message": "Benutzername ist schon vergeben, bitte gib einen anderen ein."}
        return Response(json.dumps(response), mimetype="application/json")
    else:
        user = User(username=username, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        response = {"message": "Account wurde erstellt. Bitte geh zur Loginseite und melde dich an."}
        return Response(json.dumps(response), mimetype="application/json")


@app.route("/", methods=["POST", "GET"])
def index():
    if request.form.get("redirect_users"):
        return redirect(url_for("login"))
    elif request.form.get("redirect_add_recipes"):
        return redirect(url_for("add_ingredient"))
    else:
        return redirect(url_for("random_recipes"))


@app.route("/login", methods=["POST"])
def login():
    get_login_form = request.get_json()
    username = str(get_login_form["username"]).lower()
    password = str(get_login_form["password"])
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return "success"
    else:
        response = {"message": "Login fehlerhaft, bitte Username und Passwort überprüfen."}
        return Response(json.dumps(response), mimetype="application/json")


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("index"))


@app.route("/addingredients", methods=["POST"])
# @login_required
def add_ingredient():
    get_ingredients = request.get_json()
    recipe_name = get_ingredients["name"]
    recipe = Recipe(recipe_name=recipe_name, owner=current_user)
    db.session.add(recipe)
    db.session.commit()
    for element in range(len(get_ingredients["ingredients"])):
        if get_ingredients["ingredients"][element]["name"] == 0 or get_ingredients["ingredients"][element][
            "name"] == "":
            return "Failure"
        elif get_ingredients["ingredients"][element]["number"] == 0 or get_ingredients["ingredients"][element][
            "number"] == "":
            return "Failure"
        elif get_ingredients["ingredients"][element]["unit"] == 0 or get_ingredients["ingredients"][element][
            "unit"] == "":
            return "Failure"
        else:
            ingredient = get_ingredients["ingredients"][element]["name"]
            amount = get_ingredients["ingredients"][element]["number"]
            unit = get_ingredients["ingredients"][element]["unit"]
            current_recipe = Recipe.query.filter_by(recipe_name=recipe_name).first()
            ingredients = Ingredient(ingredient=ingredient, amount=amount, unit=unit, recipe_name=current_recipe,
                                     owner=current_user)
            db.session.add(ingredients)
            db.session.commit()
    return "Success"


@app.route("/randommealplan", methods=["GET"])
# @login_required
def random_recipes():
    recipe_list = []
    recipe_list_db = Recipe.query.filter_by(user_id=current_user.id).all()
    recipe_schema = RecipeSchema(many=True)
    recipe_list_json = recipe_schema.dump(recipe_list_db)
    for recipe in recipe_list_json:
        recipe_list.append(recipe["recipe_name"])
    random_list = []
    response = []
    weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    while len(random_list) != 7:
        n = random.randint(0, len(recipe_list) - 1)
        if n in random_list:
            pass
        else:
            random_list.append(n)
    for i, weekday in enumerate(weekdays):
        response.append({"weekday": weekday, "recipe": recipe_list[random_list[i]]})
    return Response(json.dumps(response), mimetype="application/json")


@app.route("/showingredients", methods=["GET"])
# @login_required
def show_ingredients():
    recipe_name = request.form.get("recipe")
    ingredient_list_db = Ingredient.query.filter_by(recipes_id=recipe_name, user_id=current_user.id).all()
    ingredient_schema = IngredientSchema(many=True)
    ingredient_list_json = ingredient_schema.dump(ingredient_list_db)
    return Response(json.dumps(ingredient_list_json), mimetype="application/json")


@app.route("/recipeoverview", methods=["GET"])
# @login_required
def recipe_overview():
    recipe_list_db = Recipe.query.filter_by(user_id=current_user.id).all()
    recipe_schema = RecipeSchema(many=True)
    recipe_list = recipe_schema.dump(recipe_list_db)
    return Response(json.dumps(recipe_list), mimetype="application/json")


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
