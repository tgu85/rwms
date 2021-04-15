import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap-v5";
import './testApp.css';

//this App displays the weekly meal plan
class ShowIngredients extends Component {
    constructor() {
        super()
        this.state = {
            recipe: '',
            ingredients: [
                {'name': '', 'amount': '', 'unit': ''},
                {'name': '', 'amount': '', 'unit': ''},
                {'name': '', 'amount': '', 'unit': ''},
                {'name': '', 'amount': '', 'unit': ''},
                {'name': '', 'amount': '', 'unit': ''}
            ],
        }
    }

    componentDidMount() {
        this.show();
    }

    show() {

        //get parameter bekommen und in eine Variable packen
        // dann Variable an den Pfad anhängen (name=var)
        console.log("done");
        fetch(process.env.REACT_APP_APIURL + "/showingredients?name=recipe", {credentials:"include"})
            .then(response => response.json())
            .then(recipe => this.setState({recipe: recipe}))
            .then (ingredients => this.setState({ingredients: ingredients}));
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col id="heading"><h1>{this.state.recipe}</h1></Col>
                    </Row>
                    <Row className="justify-content-md-center gx-2">
                        {
                        this.state.ingredients.map((entry, ) =>
                        <Col md={3}>
                            <p>{entry["ingredient"]}</p>
                            <p>{entry["amount"]}</p>
                            <p>{entry["unit"]}</p>
                        </Col>)
                        }
                    </Row>
                </Container>
            </div>
        );
    }
};

export default ShowIngredients;
