import { Component } from 'react';
import {Button, Form, FormControl, FormGroup} from 'react-bootstrap-v5';
import { Rating } from 'semantic-ui-react';
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
                    <Form.Row>
                        <FormGroup>
                            <Form.Label id="ingredientName">Ingredient
                                <Form.Control key={ingredientFields.id} placeholder="Ingredient"
                                              value={this.state.ingredients[i].name}
                                              onChange={event => {
                                                  //ToDo: Use correct state life cycle
                                                  let ingredientsNew = this.state.ingredients;
                                                  ingredientsNew[i].name = event.target.value;
                                                  this.setState({ingredients: ingredientsNew})
                                              }}/>
                            </Form.Label>
                            <Form.Label id="number">Amount
                                <FormControl key={ingredientFields.id} placeholder="number"
                                             value={this.state.ingredients[i].number}
                                             onChange={event => {
                                                 //ToDo: Use correct state life cycle
                                                 let ingredientsNew = this.state.ingredients;
                                                 ingredientsNew[i].number = event.target.value;
                                                 this.setState({ingredients: ingredientsNew})
                                             }}/>
                            </Form.Label>
                            <Form.Label id="unit">Unit
                                <FormControl key={ingredientFields.id} placeholder="unit"
                                             value={this.state.ingredients[i].unit}
                                             onChange={event => {
                                                 //ToDo: Use correct state life cycle
                                                 let ingredientsNew = this.state.ingredients;
                                                 ingredientsNew[i].unit = event.target.value;
                                                 this.setState({ingredients: ingredientsNew})
                                             }}/>
                            </Form.Label>
                        </FormGroup>
                    </Form.Row>
            );
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
                <Form.Row>Recipe Name
                    <FormControl placeholder="Recipe Name"
                           value={this.state.name}
                           onChange={event => this.setState({name: event.target.value})}/>
                </Form.Row>
                <Form.Field>Favourite
                    <Rating icon='heart'
                            maxRating={3}
                            rating={this.state.rating}
                            onRate={(_, data) => {
                                this.setState({rating: data.rating});
                            }}/>
                </Form.Field>
                {this.createIngredientFormField()}
                <Form.Group>
                    <Button onClick={this.addRecipe}>Add Recipe</Button>
                </Form.Group>
            </div>
        )
    }
};

export default RecipeForm;
