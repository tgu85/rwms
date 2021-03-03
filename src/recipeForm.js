import { Component } from 'react';
import {Button, Form, Input, Rating} from 'semantic-ui-react';
import './recipeForm.css';

class RecipeForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            rating: 1,
            ingredients: [
                {'name': '', 'number': 0, 'unit': ''},
                {'name': '', 'number': 0, 'unit': ''},
                {'name': '', 'number': 0, 'unit': ''},
                {'name': '', 'number': 0, 'unit': ''},
                {'name': '', 'number': 0, 'unit': ''}
            ],
        }
        this.addRecipe = this.addRecipe.bind(this);
    }

    createIngredientFormField() {
        let ingredientFields = [];
        for (let i = 0; i < 5; i++) {
            ingredientFields.push(
                <Form.Field id="ingredientName">Ingredient
                    <Input placeholder="Ingredient"
                           value={this.state.ingredients[i].name}
                           onChange={event => {
                               //ToDo: Use correct state life cycle
                               let ingredientsNew = this.state.ingredients;
                               ingredientsNew[i].name = event.target.value;
                               this.setState({ingredients: ingredientsNew})
                           }}/>
                </Form.Field>
            );
                ingredientFields.push(
                <Form.Field id="number">Amount
                    <Input placeholder="number"
                       value={this.state.ingredients[i].number}
                       onChange={event => {
                           //ToDo: Use correct state life cycle
                           let ingredientsNew = this.state.ingredients;
                           ingredientsNew[i].number = event.target.value;
                           this.setState({ingredients: ingredientsNew})
                       }}/>
                </Form.Field>
        );
            ingredientFields.push(
                <Form.Field id="unit">Unit
                    <Input placeholder="unit"
                           value={this.state.ingredients[i].unit}
                           onChange={event => {
                               //ToDo: Use correct state life cycle
                               let ingredientsNew = this.state.ingredients;
                               ingredientsNew[i].unit = event.target.value;
                               this.setState({ingredients: ingredientsNew})
                           }}/>
                </Form.Field>
            )
        }
        return ingredientFields
    }

    async addRecipe() {
        const recipe = {'name': this.state.name, 'rating': this.state.rating, 'ingredients': this.state.ingredients};
        const response = await fetch('/addingredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipe)
            }
        )
        if (response.ok) {
            this.setState({
                name: '', rating: 1, ingredients: [
                    {'name': '', 'number': 0, 'unit': ''},
                    {'name': '', 'number': 0, 'unit': ''},
                    {'name': '', 'number': 0, 'unit': ''},
                    {'name': '', 'number': 0, 'unit': ''},
                    {'name': '', 'number': 0, 'unit': ''}
                ]
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Add New Recipe</h1>
            <Form>
                <Form.Field>Recipe Name
                    <Input placeholder="Recipe Name"
                           value={this.state.name}
                           onChange={event => this.setState({name: event.target.value})}/>
                </Form.Field>
                <Form.Field>Favourite
                    <Rating icon='heart'
                            maxRating={3}
                            rating={this.state.rating}
                            onRate={(_, data) => {
                                this.setState({rating: data.rating});
                            }}/>
                </Form.Field>
                {this.createIngredientFormField()}
                <Form.Field>
                    <Button onClick={this.addRecipe}>Add Recipe</Button>
                </Form.Field>
            </Form>
            </div>
        )
    }
};

export default RecipeForm;
