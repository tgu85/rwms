import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap-v5";
import {Link} from "react-router-dom";
import pic from '../images/salad.jpg';
import '../css/testApp.css';

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
        fetch(process.env.REACT_APP_APIURL + "/randommealplan", {credentials:"include"})
            .then(response => response.json())
            .then(recipes => this.setState({recipes: recipes}));
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col id="heading"><h1>ENJOY</h1></Col>
                    </Row>
                    <Row className="justify-content-md-center gx-2">
                    {
                        this.state.recipes.map((entry, index) =>
                            <Col md={3} className="recipeCard">
                                <p className="title">{entry["weekday"]}</p>
                                <img src={pic} id="pic" />
                                <Link to={{
                                    pathname: "/ShowIngredients",
                                    search: "?name=" + entry["recipe"],
                                }}>
                                <p className="recipe">{entry["recipe"]}</p></Link>
                                </Col>)
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
