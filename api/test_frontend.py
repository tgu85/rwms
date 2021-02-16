import random
from flask import Flask, Response
import json



app = Flask(__name__)

@app.route("/recipesdata") #TODO: fix that you will get new list when refreshing (thinking that I'm not able to do that)
def random_recipes():
    response = []
    random_list = []
    username_recipes = ['Pizza', 'Nudelauflauf', 'Linsenbolognese', 'Bohnen mit veganem Speck', 'Reissalat',
                        'Knoblauchcurry', 'Burger', 'Stampfkartoffeln', 'Kuerbissuppe', 'Tofu-Reispfanne', 'Spargel',
                        'Feuriger Guacomole Wrap mit SueÃŸkartoffeln', 'Pfannkuchen', 'Gnocci-Rosenkohl-Pfanne',
                        'Kichererbsensalat mit Couscous']
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


if __name__ == "__main__":
    app.run()