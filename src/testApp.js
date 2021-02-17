import React, {Component} from 'react';
import './testApp.css';

//this App displays the weekly meal plan
class Appli extends Component {
    constructor() {
        super()
        this.state = {
            recipes: [],
        }
        this.createPlan = this.createPlan.bind(this);
    }

    componentDidMount() {
        this.createPlan();
    }

    createPlan() {
        fetch("/recipesdata")
            .then(response => response.json())
            .then(recipes => this.setState({recipes: recipes}));
    }

    render() {
        return (
            <div>
                <h1>Recipes</h1>
                <div id="flexContainer">
                    {
                        this.state.recipes.map((entry, index) => <p>{entry["weekday"]}: {entry["recipe"]}</p>)
                    }
                </div>
                <div>
                    <button onClick={this.createPlan}> Create Random Meal Plan</button>
                </div>
            </div>
        );
    }
};

export default Appli;
