get_ingredients = {'name': 'test', 'rating': 3, 'ingredients': [{'name': 'tes', 'number': '20', 'unit': 'kf'}, {'name': 'kjsdahkj', 'number': '3', 'unit': 'kjsd'}, {'name': 'jdsj', 'number': '5', 'unit': 'kasdjkfn'}, {'name': 'ldf', 'number': '4', 'unit': 'lkjsdjf'}, {'name': 'lkjsad', 'number': '6', 'unit': 'ajhdsj'}]}
for element in range(len(get_ingredients["ingredients"])):
    print(element)
    print(get_ingredients["ingredients"][element]["unit"])

#print(len(get_ingredients["ingredients"]))