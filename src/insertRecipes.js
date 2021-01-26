import React from 'react';

class Insert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [
                {
                    name: "Tomate",
                    quantity: 0,
                },
            ]
        };
    }

    addIngredients = () => {
        var newState = [];
        for (var i = 1; i < 6; i++) {
            var name = document.getElementById(i).children[0].value;
            var quantity = document.getElementById(i).children[1].value;
            var ingredient = {
                name: name,
                quantity: quantity,
            }
            newState.push(ingredient);
        }

        this.setState( {ingredients: newState });
    };

    render() {
        return (
            <div>
                <h1>Ingredients</h1>
                <ul>
                    {this.state.ingredients.map((ingredient, i) =>
                        <li key={i}>
                            {ingredient.name}
                        </li>)
                    }
                </ul>
                <div id="1">
                    <input id="einf" value={this.state.inputName}/>
                    <input id="einf" value={this.state.inputQuan}/>
                </div>
                <div id="2">
                    <input id="einf" value={this.state.inputName}/>
                    <input id="einf" value={this.state.inputQuan}/>
                </div>
                <div id="3">
                    <input id="einf" value={this.state.inputName}/>
                    <input id="einf" value={this.state.inputQuan}/>
                </div>
                <div id="4">
                    <input id="einf" value={this.state.inputName}/>
                    <input id="einf" value={this.state.inputQuan}/>
                </div>
                <div id="5">
                    <input id="einf" value={this.state.inputName}/>
                    <input id="einf" value={this.state.inputQuan}/>
                </div>
                <button onClick={this.addIngredients} >Add ingredient</button>
                <button onClick={document.getElementById("einf").value = ""} >Clear Input Fields</button>
            </div>
        )
    };
};

export default Insert;
