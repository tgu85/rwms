import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Appli from "./testApp";
import RecipeForm from "./recipeForm";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function BasicExample() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Enjoy</Link>
                    </li>
                    <li>
                        <Link to="/new">New Recipe</Link>
                    </li>
                </ul>

                <hr />

                <Switch>
                    <Route exact path="/">
                        <Appli />
                    </Route>
                    <Route path="/new">
                        <RecipeForm />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

// You can think of these components as "pages"
// in your app.

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}
