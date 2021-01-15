import React from 'react';

class insert extends Comment {
    constructor(porps) {
        super(probs);
        this.state = {
            ingredients:[quantity[]],
            input: ""
        };
    }
}

render () {
    return (
        <div>
            <h1>Ingredients</h1>
            <ul>
                {this.state.ingredients.map((ingredient, i) =>
                <li key={i}>
                    {ingredient}
                </li>)
                }
            </ul>
            <input onChange={this.handleChange} value={this.state.input} />
            <input onChange={this.handleChange} value={this.state.input} />
            <input onChange={this.handleChange} value={this.state.input} />
            <input onChange={this.handleChange} value={this.state.input} />
            <input onChange={this.handleChange} value={this.state.input} />
            <button onClick={this.addIngredient}>Add ingredient</button>
        </div>
    )
};

handleChange = (event) => {
    this.setState({
        input: event.target.value
    })
};

addIngredient = () => {
    this.setState(state => ({
       ingredients: [...state.ingredients, state.input],
        quantity: [...state.quantity, state.input]
    }))
};


export default insert;
