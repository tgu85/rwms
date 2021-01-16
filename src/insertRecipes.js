import React from 'react';

class Insert extends React.Component {
    constructor(props) {
        super(props);
        this.state = [
                {
                    name: "Tomate",
                    quantity: 0,
                    inputName: "",
                    inputQuan: "",
                },
                ];
    }

    handleChange = (event) => {
        this.setState({
            inputName: event.target.value,
            inputQuan: event.target.value
        })
    };

    addIngredient = () => {
        this.setState(state => ({
            name: [...state.name, state.inputName],
            quantity: [...state.quantity, state.inputQuan]
        }))
    };

    render() {
        return (
            <div>
                <h1>Ingredients</h1>
                <ul>
                    {this.state.map((ingredient, i) =>
                        <li key={i}>
                            {ingredient.name}
                        </li>)
                    }
                </ul>
                <input onChange={this.handleChange} value={this.state.inputName}/>
                <input onChange={this.handleChange} value={this.state.inputName}/>
                <input onChange={this.handleChange} value={this.state.inputName}/>
                <input onChange={this.handleChange} value={this.state.inputName}/>
                <input onChange={this.handleChange} value={this.state.inputName}/>
                <input onChange={this.handleChange} value={this.state.inputQuan}/>
                <input onChange={this.handleChange} value={this.state.inputQuan}/>
                <input onChange={this.handleChange} value={this.state.inputQuan}/>
                <input onChange={this.handleChange} value={this.state.inputQuan}/>
                <input onChange={this.handleChange} value={this.state.inputQuan}/>
                <button onClick={this.addIngredient}>Add ingredient</button>
            </div>
        )
    }
}

export default Insert;
