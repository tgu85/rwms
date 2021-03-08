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
import {Container, Nav, Navbar, Row} from "react-bootstrap-v5";


export default function BasicExample() {
    return (
        <Router>
            <div>
                <Container className="Container">
                    <Row className="justify-content-md-center gx-2">
                        <ul>
                            <li>
                                <Link to="/">Enjoy</Link>
                            </li>
                            <li>
                                <Link to="/addingredients">New Recipes</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
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
