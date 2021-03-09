import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Appli from "./testApp";
import RecipeForm from "./recipeForm";
import Login from "./login";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap-v5";
import './App.css';
import './index.css';
import Startpage from "./startpage";
import Register from "./register";


export default function BasicExample() {
    return (
        <Router>
            <div>
                <Container className="Container">
                    <Row className="justify-content-center gx-10">
                        <Col>
                            <Link className="navi" to="/start">Start</Link>
                        </Col>
                        <Col>
                            <Link className="navi" to="/recipes">Enjoy</Link>
                        </Col>
                        <Col>
                            <Link className="navi" to="/addingredients">Create</Link>
                        </Col>
                        <Col>
                            <Link className="navi" to="/login">Login</Link>
                        </Col>
                        <Col>
                            <Link className="navi" to="/register">Register</Link>
                        </Col>
                </Row>
                </Container>

                <hr />

                <Switch>
                    <Route exact path="/recipes">
                        <Appli />
                    </Route>
                    <Route path="/addingredients">
                        <RecipeForm />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/start">
                        <Startpage />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

// You can think of these components as "pages"
// in your app.
