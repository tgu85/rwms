import React from 'react';

class insert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            quantity: 0
        };
    }

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

    render() {
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
                <input onChange={this.handleChange} value={this.state.input}/>
                <input onChange={this.handleChange} value={this.state.input}/>
                <input onChange={this.handleChange} value={this.state.input}/>
                <input onChange={this.handleChange} value={this.state.input}/>
                <input onChange={this.handleChange} value={this.state.input}/>
                <button onClick={this.addIngredient}>Add ingredient</button>
            </div>
        )
    }
}

export default insert;
