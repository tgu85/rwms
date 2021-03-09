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
import {button} from "semantic-ui-react";
import './App.css';
import './index.css';


export default function BasicExample() {
    return (
        <Router>
            <div>
                <Container className="Container">
                    <Row className="justify-content-md-center gx-10">
                        <Col>
                            <Link to="/">Enjoy</Link>
                        </Col>
                        <Col>
                            <Link to="/addingredients">Create</Link>
                        </Col>
                        <Col>
                            <Link to="/login">Login</Link>
                        </Col>
                </Row>
                </Container>

                <hr />

                <Switch>
                    <Route exact path="/">
                        <Appli />
                    </Route>
                    <Route path="/addingredients">
                        <RecipeForm />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

// You can think of these components as "pages"
// in your app.
