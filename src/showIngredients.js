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
                        <Col md={3}>
                            <p>{this.state.ingredients}</p>
                        </Col>),
                    }</Row>
                </Container>
            </div>
        );
    }
};

export default showIngredients;
