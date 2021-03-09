import React, { Component } from 'react';
import { button } from "semantic-ui-react";
import {Col, Container, Row} from "react-bootstrap-v5";
import {Link, Route, Switch} from "react-router-dom";
import headerpic from './header.jpg';
import './index.css';
import Appli from "./testApp";
import RecipeForm from "./recipeForm";
import Login from "./login";

class Startpage extends Component {
    render () {
        return (
            <div>
                <Container>
                    <Row>
                        <header>
                            <img src={headerpic} id="headerpic"></img>
                        </header>
                    </Row>
                <Row>
                    <Col>
                        <p className="titel">Create</p>
                        <div>
                            <p>text text text text text</p>
                            <p>text text text text text</p>
                            <p>text text text text text</p>
                        </div>
                        <button>Go!
                            <Link className="navi" to="/addingredients"></Link>
                        </button>
                    </Col>

                    <Col>
                        <p className="titel">Enjoy</p>
                        <div>
                            <p>text text text text text</p>
                            <p>text text text text text</p>
                            <p>text text text text text</p>
                        </div>
                        <button>Go!
                            <Link className="navi" to="/"></Link>
                        </button>
                    </Col>

                    <Col>
                        <p className="titel">Discover</p>
                        <div>
                            <p>text text text text text</p>
                            <p>text text text text text</p>
                            <p>text text text text text</p>
                        </div>
                        <button>Go!</button>
                    </Col>
                </Row>
                </Container>
            </div>
            )
    }
};

export default Startpage;