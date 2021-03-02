# import pandas as pd
import json
import random
from flask import Flask, Response, request, render_template, redirect, url_for, flash
from flask_login import current_user, login_user, UserMixin, LoginManager, login_required
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///user.db"
app.config["SECRET_KEY"] = "test1234"
db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
<<<<<<< HEAD
    # password = db.Column(db.String(60), nullable=False)       #TODO: Maybe later
    recipes = db.relationship("Recipes", backref="owner", lazy=True)
=======
    password = db.Column(db.String(60), nullable=False)
    recipes = db.relationship("Recipes", backref="owner", lazy=True)
    ingredients = db.relationship("Ingredients", backref="owner", lazy=True)
>>>>>>> a3a0023fec4843fbed5d482f5177ad36a28e8062

    def __repr__(self):
        return f"{self.username}"


class Recipes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_name = db.Column(db.String(50), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    ingredients = db.relationship("Ingredients", backref="recipe_name", lazy=True)

    def __repr__(self):
        return f"{self.recipe_name}"


class Ingredients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ingredient = db.Column(db.String(30), unique=True, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    recipes_id = db.Column(db.String(50), db.ForeignKey("recipes.recipe_name"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return f"{self.ingredient}, {self.amount},{self.unit}"


class RecipeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Recipes


class IngredientSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Ingredients


@login_manager.user_loader
def load_user(user_id):
    # since the user_id is just the primary key of our user table, use it in the query for the user
    return User.query.get(int(user_id))


@login_manager.unauthorized_handler       # In unauthorized_handler we have a callback URL #TODO: fix login_required
def unauthorized_callback():              # In call back url we can specify where we want to
       return redirect(url_for('login'))  # redirect the user in my case it is login page!


@app.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        if request.form.get("register_user"):
            username = request.form.get("username").lower()
            password = request.form.get("password")
            hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
            if User.query.filter_by(username=username).first():
                flash("Benutzername ist schon vergeben, bitte gib einen anderen ein.")
                return redirect(url_for("register"))
            else:
                user = User(username=username, password=hashed_password)
                db.session.add(user)
                db.session.commit()
                # flash message that account was created and you can log in.
                return redirect(url_for("login"))
        else:
            return redirect(url_for("index"))
    if request.method == "GET":
        return render_template("register.html")

@app.route("/", methods=["POST", "GET"])
def index():
    print(User.is_authenticated)
    print(User.is_active)
    if request.method == "POST":
        if request.form.get("redirect_users"):
            return redirect(url_for("login"))
        elif request.form.get("redirect_add_recipes"):
            return redirect(url_for("add_ingredient"))
        else:
            return redirect(url_for("random_recipes"))
    else:
        return render_template("index.html")


@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        if request.form.get("redirect_index"):
            return redirect(url_for("index"))
        elif request.form.get("random_meal_plan"):
            username = request.form.get("username").lower()
            password = request.form.get("password")
            user = User.query.filter_by(username=username).first()
            if user and bcrypt.check_password_hash(user.password, password):
                login_user(user)
                return redirect(url_for("index"))
            else:
<<<<<<< HEAD
                add_user(username)
            return filename_user_recipes, filename_user_ingredients  # TODO: try to return html and variable (or do something with routing)
=======
                # flash Login unsuccessful. Please check entries or register
                return redirect(url_for("login"))
>>>>>>> a3a0023fec4843fbed5d482f5177ad36a28e8062
        else:
            pass
    if request.method == "GET":
        return render_template("login.html")


<<<<<<< HEAD

@app.route("/createRecipe", methods=["POST"])
def add_ingredient():
    global ingredients_of_recipes
    print(request.is_json)
    data = request.get_json()
    print(data)
    return "erfolgreich"
    # if request.method == "POST":
        # if request.form.get("redirect_index"):
            # return redirect(url_for("index"))
        # else:
           # ingredients_of_recipes = {}
           # read_ingredient_file()
            # recipe_name = request.form.get("name")
            # ingredient = request.form.get("ingredient.name")
            # amount = request.form.get("number")
            # unit = request.form.get("unit") #TODO: implement unit when using SQl
            # add_recipe(recipe_name)
            # if recipe_name in ingredients_of_recipes:
               # ingredients_current_recipe = ingredients_of_recipes[recipe_name]
            # else:
               # ingredients_current_recipe = {}
            # ingredients_current_recipe[ingredient] = amount
            # ingredients_of_recipes[recipe_name] = ingredients_current_recipe
            # save_ingredient_file()
           # print(data)
           # return render_template("add_ingredients.html")
    # else:
        # return render_template("add_ingredients.html")
=======
@app.route("/addingredients", methods=["POST", "GET"])
@login_required #TODO: fix this, has to be something with User.is_authenticated or so
def add_ingredient():
    if request.method == "POST":
        if request.form.get("redirect_index"):
            return redirect(url_for("index"))
        else:
            # print(request.is_json)
            # test = request.get_json()
            # print(test)
            recipe_name = str(request.form.get("recipe_name"))
            ingredient = request.form.get("ingredient")
            amount = request.form.get("amount")
            unit = request.form.get("unit")
            recipe = Recipes(recipe_name=recipe_name, owner=current_user)
            db.session.add(recipe)
            db.session.commit()
            current_recipe = Recipes.query.filter_by(recipe_name=recipe_name).first()
            ingredients = Ingredients(ingredient=ingredient, amount=amount, unit=unit, recipe_name=current_recipe, owner=current_user)
            db.session.add(ingredients)
            db.session.commit()
            return render_template("add_ingredients.html")
    else:
        return render_template("add_ingredients.html")
>>>>>>> a3a0023fec4843fbed5d482f5177ad36a28e8062


@app.route("/recipes", methods=["POST", "GET"])
@login_required
def random_recipes():
    recipe_list = []
    if request.method == "POST":
        if request.form.get("redirect_index"):
            return redirect(url_for("index"))
        else:
            recipe_list_db = Recipes.query.filter_by(user_id=current_user.id).all()
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
    else:
        return render_template("generate_random_recipes.html")


@app.route("/show_ingredients", methods=["POST", "GET"])
@login_required
def show_ingredients():
    if request.method == "POST":
        if request.form.get("redirect_index"):
            return redirect(url_for("index"))
        else:
            recipe_name = request.form.get("recipe")
            ingredient_list_db = Ingredients.query.filter_by(recipes_id=recipe_name, user_id=current_user.id).all()
            ingredient_schema = IngredientSchema(many=True)
            ingredient_list_json = ingredient_schema.dump(ingredient_list_db)
            return Response(json.dumps(ingredient_list_json), mimetype="application/json")
    else:
        return render_template("show_ingredients.html")


<<<<<<< HEAD
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

# create DataFrame
# recipes = pd.DataFrame(data=dict_ingredients_of_recipes)
# print(recipes)

=======
>>>>>>> a3a0023fec4843fbed5d482f5177ad36a28e8062
if __name__ == "__main__":
    app.run()
