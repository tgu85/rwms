import React, { Component, useEffect } from 'react';
import { ShowRecipes } from "./showRecipes";
import Searchbox from "./components/Searchbox";
import { Recipes } from "./components/Recipes";

//this App displays the recipes from showRecipes
class Appli extends Component {
    constructor() {
        super()
        this.state = {
            recipes: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch("/recipesdata")
            .then(response => response.json())
            .then(recipes => this.setState({ recipes: recipes}));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value});
    }

    render() {
        //const filterRecipes = this.state.recipes.filter(recipe => {
            //return recipe.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
       // });
        return (
            <div>
                <h1>Recipes</h1>
                {
                    this.state.recipes.map((entry, index)=>(
                        <p>{entry["weekday"]}: {entry["recipe"]}</p>
                    ))
                }
            </div>
        );
    }
}

export default Appli;
