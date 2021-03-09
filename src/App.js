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
import {Col, Container, Nav, Navbar, Row, Button} from "react-bootstrap-v5";
import './App.css';
import './index.css';


export default function BasicExample() {
    return (
        <Router>
            <div>
                <Container className="Container">
                    <Row className="justify-content-md-center gx-2">
                        <Col>
                            <Button class="btn btn-outline-danger">
                            <Link to="/">Enjoy</Link>
                            </Button>
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
