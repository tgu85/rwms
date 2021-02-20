## Installation Guide:
## You can ignore the import of the pandas library, it's not used yet.


import pandas as pd
import json
import os
import random

# Declaration of Variables, List and Dictionaries
ingredients_of_recipes = {}
dict_ingredients_current_recipe = {}
random_meal_plan = {}
username_recipes = []
random_list = []
users = {}
filename_user_recipes = ""
filename_user_ingredients = ""
current_recipe = ""
path = "C:\\Users\\steff\\Google Drive\\PycharmProjects\\RandomMealSchedule\\"


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
    with open(f"{path}{file_user_recipes}", "r") as file:
        filecontents = file.readlines()
        for line in filecontents:
            active_recipe = line[:-1]
            username_recipes.append(active_recipe)
    return username_recipes


def read_ingredient_file():
    global path, filename_user_ingredients, ingredients_of_recipes
    with open(f"{path}{file_user_ingredients}", 'r') as file:
        if os.stat(f"{path}{file_user_ingredients}").st_size == 0:
            pass
        else:
            dict_ingredients_of_recipes = json.load(file)
    return dict_ingredients_of_recipes


def save_user_files():
    global path, users
    with open(f"{path}users.txt", 'w') as file:
        json.dump(users, file)


def save_recipe_file():
    global path, filename_user_recipes, username_recipes
    with open(f"{path}{file_user_recipes}", "w") as file:
        for recipe in username_recipes:
            file.writelines(f"{recipe}\n")


def save_ingredient_file():
    global path, filename_user_ingredients, ingredients_of_recipes
    with open(f"{path}{file_user_ingredients}", 'w') as file:
        json.dump(dict_ingredients_of_recipes, file)


def add_user(username):
    global users, filename_user_recipes, filename_user_ingredients
    read_user_files()
    username = username.lower()
    users[username] = [f"{username}_recipes.txt", f"{username}_ingredients.txt"]
    file_user_recipes = users[username][0]
    file_user_ingredients = users[username][1]
    with open(f"{path}{file_user_recipes}", "x"):
        pass
    with open(f"{path}{file_user_ingredients}", "x"):
        pass
    save_user_files()
    return users, file_user_recipes, file_user_ingredients


def choose_user(username):
    global users, filename_user_recipes, filename_user_ingredients
    read_user_files()
    username = username.lower()
    if username in users:
        file_user_recipes = users[username][0]
        file_user_ingredients = users[username][1]
    else:
        add_user(username)
        print("Benutzer wurde erstellt, da noch nicht vorhanden.")
    return file_user_recipes, file_user_ingredients


def add_recipe(recipe_name):
    global username_recipes, dict_ingredients_current_recipe, current_recipe
    current_recipe = recipe_name
    username_recipes = []
    read_recipe_file()
    dict_ingredients_current_recipe = {}
    if recipe_name in username_recipes:
        pass
    else:
        username_recipes.append(recipe_name)
    save_recipe_file()
    return username_recipes, current_recipe


def add_ingredient(recipe_name, ingredient, amount):
    global ingredients_of_recipes, dict_ingredients_current_recipe
    dict_ingredients_of_recipes = {}
    read_ingredient_file()
    dict_ingredients_current_recipe[ingredient] = amount
    dict_ingredients_of_recipes[recipe_name] = dict_ingredients_current_recipe
    save_ingredient_file()
    return dict_ingredients_of_recipes, dict_ingredients_current_recipe

def random_recipes():
    global username_recipes, random_meal_plan, random_list
    read_recipe_file()
    weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
    while len(random_list) != 7:
        n = random.randint(0, len(username_recipes) - 1)
        if n in random_list:
            pass
        else:
            random_list.append(n)
    for i, weekday in enumerate(weekdays):
        random_meal_plan[weekday] = username_recipes[random_list[i]]
    return random_meal_plan


def show_ingredients(recipe="Pizza"):
    global ingredients_of_recipes
    read_ingredient_file()
    response = []
    for (key, value) in dict_ingredients_of_recipes[recipe].items():
        response.append({"ingredient": key, "amount": value})
    return response


# testing section
choose_user("Steffen")
show_ingredients("Pizza")

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
