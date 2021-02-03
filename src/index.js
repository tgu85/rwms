import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './containers/App';
//import Titel from './components/Titel.js';
import CardList from './components/CardList';
import reportWebVitals from './reportWebVitals';
import 'tachyons';
import {members} from './Members.js';
import Insert from "./insertRecipes";
import Planer from "./planer";
//import RecipeForm from "./recipeForm";
import 'semantic-ui-css/semantic.min.css'
//import Test from "./showRecipes";
//import Recipes from "./components/Recipes";
import Appli from "./testApp";


//ReactDOM.render(<Titel />, document.getElementById('root')
//);
//ReactDOM.render(
    //<App />
   // , document.getElementById('root'));
//ReactDOM.render(
    //<RecipeForm />
    //, document.getElementById('root'));
//ReactDOM.render(
    //<Test />
   // , document.getElementById('root'));
//ReactDOM.render(
    //<Recipes />
    //, document.getElementById('root'));
ReactDOM.render(
    <Appli />
    , document.getElementById('root'));
//ReactDOM.render(
    //<Planer />
    //, document.getElementById('root'));


///If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
