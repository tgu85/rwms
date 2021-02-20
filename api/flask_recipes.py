
# import pandas as pd
import json
import os
import random
from flask import Flask, Response, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///site.db"
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    #password = db.Column(db.String(60), nullable=False)       #TODO: Maybe later
    recipes = db.relationship("Recipes", backref="owner", lazy=True)
    def __repr__(self):
        return f"User('{self.username}')"


class Recipes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_name = db.Column(db.String(50), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    ingredients = db.relationship("Ingredients", backref="recipe_name", lazy=True)

    def __repr__(self):
        return f"Recipes('{self.recipe_name}')"


class Ingredients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ingredient = db.Column(db.String(30), unique=True, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    recipes_id = db.Column(db.String(50), db.ForeignKey("recipes.id"), nullable=False)

    def __repr__(self):
        return f"Ingredients('{self.ingredient}', '{self.amount}', '{self.unit}')"


# Declaration of Variables, List and Dictionaries
ingredients_of_recipes = {}
username_recipes = []
users = {}
filename_user_recipes = ""
filename_user_ingredients = ""
current_recipe = ""
path = "C:\\Users\\steff\\Google Drive\\PycharmProjects\\rwms\\api\\"


# function definition

def read_user_files():
    global path, users
    if not (os.path.isfile(f"{path}users.txt")):
        with open(f"{path}users.txt", "x"):
            pass

    with open(f"{path}users.txt", 'r') as file:
        if os.stat(f"{path}users.txt").st_size == 0:
            pass
        else:
            users = json.load(file)
    return users


def read_recipe_file():
    global path, filename_user_recipes, username_recipes
    with open(f"{path}{filename_user_recipes}", "r") as file:
        filecontents = file.readlines()
        for line in filecontents:
            active_recipe = line[:-1]
            username_recipes.append(active_recipe)
    return username_recipes


def read_ingredient_file():
    global path, filename_user_ingredients, ingredients_of_recipes
    with open(f"{path}{filename_user_ingredients}", 'r') as file:
        if os.stat(f"{path}{filename_user_ingredients}").st_size == 0:
            pass
        else:
            ingredients_of_recipes = json.load(file)
    return ingredients_of_recipes


def save_user_files():
    global path, users
    with open(f"{path}users.txt", 'w') as file:
        json.dump(users, file)


def save_recipe_file():
    global path, filename_user_recipes, username_recipes
    with open(f"{path}{filename_user_recipes}", "w") as file:
        for recipe in username_recipes:
            file.writelines(f"{recipe}\n")


def save_ingredient_file():
    global path, filename_user_ingredients, ingredients_of_recipes
    with open(f"{path}{filename_user_ingredients}", 'w') as file:
        json.dump(ingredients_of_recipes, file)


def add_user(username):
    global users, filename_user_recipes, filename_user_ingredients
    read_user_files()
    username = username.lower()
    users[username] = [f"{username}_recipes.txt", f"{username}_ingredients.txt"]
    filename_user_recipes = users[username][0]
    filename_user_ingredients = users[username][1]
    with open(f"{path}{filename_user_recipes}", "x"):
        pass
    with open(f"{path}{filename_user_ingredients}", "x"):
        pass
    save_user_files()
    user = User(username=username)
    db.session.add(user)
    db.session.commit()
    return users, filename_user_recipes, filename_user_ingredients



@app.route("/", methods=["POST", "GET"])
def index():
    if request.method == "POST":
        if request.form.get("redirect_users"):
            return redirect(url_for("choose_user"))
        elif request.form.get("redirect_add_recipes"):
            return redirect(url_for("add_ingredient"))
        else:
            return redirect(url_for("random_recipes"))
    else:
        return render_template("index.html")


@app.route("/user", methods=["POST", "GET"])
def choose_user():
    global users, filename_user_recipes, filename_user_ingredients
    if request.method == "POST":
        if request.form.get("redirect_index"):
            return redirect(url_for("index"))
        elif request.form.get("random_meal_plan"):
            read_user_files()
            username = request.form.get("username").lower()
            if username in users:
                filename_user_recipes = users[username][0]
                filename_user_ingredients = users[username][1]
            else:
                add_user(username)
            if bool(db.session.query(User).filter_by(username=username).first()):
                print("User exists")
            else:
                add_user(username)
            return filename_user_recipes, filename_user_ingredients #TODO: try to return html and variable (or do something with routing)
        else:
            pass
    else:
        return render_template("user.html")


def add_recipe(recipe_name):
    global username_recipes, current_recipe
    current_recipe = recipe_name
    username_recipes = []
    read_recipe_file()
    if recipe_name in username_recipes:
        pass
    else:
        username_recipes.append(recipe_name)
    save_recipe_file()
    return username_recipes, current_recipe

@app.route("/addingredients", methods=["POST", "GET"])
def add_ingredient():
    global ingredients_of_recipes
    if request.method == "POST":
        if request.form.get("redirect_index"):
            return redirect(url_for("index"))
        else:
            ingredients_of_recipes = {}
            read_ingredient_file()
            recipe_name = request.form.get("recipe_name")
            ingredient = request.form.get("ingredient")
            amount = request.form.get("amount")
            #unit = request.form.get("unit") #TODO: implement unit when using SQl
            add_recipe(recipe_name)
            if recipe_name in ingredients_of_recipes:
                ingredients_current_recipe = ingredients_of_recipes[recipe_name]
            else:
                ingredients_current_recipe = {}
            ingredients_current_recipe[ingredient] = amount
            ingredients_of_recipes[recipe_name] = ingredients_current_recipe
            save_ingredient_file()
            return render_template("add_ingredients.html")
    else:
        return render_template("add_ingredients.html")


@app.route("/recipes", methods=["POST", "GET"])
def random_recipes():
    global username_recipes
    if request.method == "POST":
        if request.form.get("redirect_index"):
            return redirect(url_for("index"))
        else:
            read_recipe_file()
            random_list = []
            response = []
            weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
            while len(random_list) != 7:
                n = random.randint(0, len(username_recipes) - 1)
                if n in random_list:
                    pass
                else:
                    random_list.append(n)
            for i, weekday in enumerate(weekdays):
                response.append({"weekday": weekday, "recipe": username_recipes[random_list[i]]})
            return Response(json.dumps(response), mimetype="application/json")
    else:
        return render_template("generate_random_recipes.html")


@app.route("/show_ingredients", methods=["POST", "GET"])
def show_ingredients():
    global ingredients_of_recipes
    if request.method == "POST":
        if request.form.get("redirect_index"):
            return redirect(url_for("index"))
        else:
            read_ingredient_file()
            response = []
            recipe = request.form.get("recipe")
            for (key, value) in ingredients_of_recipes[recipe].items():
                response.append({"ingredient": key, "amount": value})
            return Response(json.dumps(response), mimetype="application/json")
    else:
        return render_template("show_ingredients.html")


# testing section
# username = "Steffen"
# choose_user(username)
# username = str(input("Wähle deinen Benutzer: "))
# choose_user(str(username).lower())
# add_recipe("Pizza")
# add_ingredient(current_recipe, "Tomaten", "4")
# add_ingredient(current_recipe, "Brokkoli", "1")
# add_ingredient(current_recipe, "Sauce Hollondaise", "1 Packung")
# add_recipe("Linseneintopf")
# add_ingredient(current_recipe, "Linsen", "500 g")
# add_ingredient(current_recipe, "Kartoffeln", "1,5 kg")
# # add_recipe("Knoblauchcurry")
# # add_ingredient("Knoblauchcurry", "Knoblauch", "100 Zehen")
# # add_ingredient("Knoblauchcurry", "Kokosmilch", "2 Dosen")
# # random_recipes()
# # print(meal_plan)
# # print(username_recipes)
# add_recipe("Kichererbsen-Spinat-Curry")
# add_ingredient(current_recipe, "Kichererbsen", "2 Dosen")
# add_ingredient(current_recipe, "Spinat", "500 g")
# add_recipe("Kacke")
# add_recipe("Hallo")

#create DataFrame
# recipes = pd.DataFrame(data=dict_ingredients_of_recipes)
# print(recipes)

if __name__ == "__main__":
    app.run()
