import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap-v5";
import './testApp.css';

//this App displays the weekly meal plan
class showIngredients extends Component {
    constructor() {
        super()
        this.state = {
            recipe: '',
            rating: '',
            ingredients: [
                {'name': '', 'number': '', 'unit': ''},
                {'name': '', 'number': '', 'unit': ''},
                {'name': '', 'number': '', 'unit': ''},
                {'name': '', 'number': '', 'unit': ''},
                {'name': '', 'number': '', 'unit': ''}
            ],
        }
    }

    componentDidMount() {
        this.show();
    }

    show() {
        fetch(process.env.REACT_APP_APIURL + "/showingredients", {credentials:"include"})
            .then(response => response.json())
            .then(recipe => this.setState({recipe: recipe}))
            .then(rating => this.setState({rating: rating}))
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
                                    <p className="title">{entry["ingredient"]}</p>
                                </Col>)
                        }</Row>
                    <Row>
                        {
                            this.state.ingredients.amount.map((entry, index) =>
                            <Col>
                                <p>{entry["amount"]}</p>
                            </Col>)
                        }
                    </Row>
                    <Row>
                        {
                            this.state.ingredients.unit.map((entry, index) =>
                                <Col>
                                    <p>{entry["unit"]}</p>
                                </Col>)
                        }
                    </Row>
                </Container>
            </div>
        );
    }
};

export default showIngredients;
