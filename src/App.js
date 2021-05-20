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
import {Col, Container, Navbar, Row, Nav} from "react-bootstrap-v5";
import '../css/App.css';
import '../css/index.css';
import logo from '../images/Monkey.png'
import Startpage from "./startpage";
import Register from "./register";
import ShowIngredients from "./showIngredients";


export default function BasicExample() {
    return (
        <Router>
            <div className="navbarSt">
                <Navbar>
                    <img className="logoNav" src={logo}></img>
                    <Nav.Link className="navi" href="/">Start</Nav.Link>
                    <Nav.Link className="navi" href="/randommealplan">Enjoy</Nav.Link>
                    <Nav.Link className="navi" href="/addingredients">Create</Nav.Link>
                    <Nav.Link className="navi" href="/login">Login</Nav.Link>
                    <Nav.Link className="navi" href="/register">Register</Nav.Link>
                </Navbar>

                <hr />

                <Switch>
                    <Route exact path="/randommealplan">
                        <Appli />
                    </Route>
                    <Route exact path="/addingredients">
                        <RecipeForm />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/">
                        <Startpage />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/showingredients">
                        <ShowIngredients />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};