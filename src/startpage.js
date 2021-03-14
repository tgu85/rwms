import React, { Component } from 'react';
import { button } from "semantic-ui-react";
import {Col, Container, Row} from "react-bootstrap-v5";
import {Link} from "react-router-dom";
import headerpic from './header2.png';
import './startpage.css';
import './index.css';

class Startpage extends Component {
    render () {
        return (
            <div>
                <div id="headerpic">
                <header>
                    <img src={headerpic}></img>
                </header>
                </div>
                <Container>
                <Row>
                    <Col className="startText">
                        <p className="titleStart">Create</p>
                        <div className="startBox">
                            <p>You already have a bunch of recipes?
                                Add them to your own recipe database and create your random meal plan with your own recipes.</p>
                            <p>So you know exactly what to do when it comes to cooking and you do not have to learn new, maybe difficult recipes. </p>
                            <p>Let's start and create your own digital cookbook!</p>
                        </div>
                        <div className="butStart">
                        <Link to="/addingredients">
                        <button>Go!</button>
                        </Link>
                        </div>
                    </Col>

                    <Col className="startText">
                        <p className="titleStart">Enjoy</p>
                        <div className="startBox">
                            <p>In the Enjoy section you can let the website create a random weekly meal plan for you.</p>
                            <p>If you have added any own recipes in the Create section, the random meal plan will be filled with your own recipes.
                            Letting the website tell you what to cook on each day of a week saves you a lot of time.
                                Besides that, you can go grocery shopping at the beginning of the week and thus reduce the amount of going grocery shopping.</p>
                            <p>The random meal plan can help you to force a healthy lifestyle, because you can easily plan your meals for the week and avoid ordering too many pizzas a week. </p>
                            </div>
                        <div className="butStart">
                        <Link to="/randommealplan">
                            <button>Go!</button>
                        </Link>
                        </div>
                    </Col>

                    <Col className="startText">
                        <p className="titleStart">Discover</p>
                        <div className="startBox">
                            <p>This is your digital cookbook.</p>
                            <p>Here you get an overview over your own recipe database.</p>
                            <p>Every added recipe will be shown in this section, so you will always remember what amazing recipes you know and love.</p>
                        </div>
                        <div className="butStart">
                        <button>Go!</button>
                        </div>
                    </Col>
                </Row>
                </Container>
            </div>
            )
    }
};

export default Startpage;