import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap-v5";
import pic from './veggi-bowl.jpg';
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
                <Container>
                    <Row>
                        <Col id="heading"><h1>Enjoy</h1></Col>
                    </Row>
                    <Row className="justify-content-md-center gx-10">
                    {
                        this.state.recipes.map((entry, index) =>
                            <Col md={3} className="recipeCard">
                                <p className="title">{entry["weekday"]}</p>
                                <img src={pic} id="pic" />
                                <p>{entry["recipe"]}</p></Col>)
                    }</Row>
                    <Row className="justify-content-md-center">
                        <Col md={3}>
                        <button onClick={this.createPlan}>Create Random Meal Plan</button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default Appli;
