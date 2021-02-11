import React, { Component } from 'react';

//this App displays the weekly meal plan
class Appli extends Component {
    constructor() {
        super()
        this.state = {
            recipes: [],
        }
    }

    componentDidMount() {
        fetch("/recipesdata")
            .then(response => response.json())
            .then(recipes => this.setState({ recipes: recipes}));
    }

    render() {
        return (
            <div>
                <h1>Recipes</h1>
                {
                    <div>
                    this.state.recipes.map((entry, index)=>(
                        <p>{entry["weekday"]}: {entry["recipe"]}</p>
                    ))
                    </div>
                }
            </div>
        );
    }
};

export default Appli;
