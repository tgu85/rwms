import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.js';
import '../css/testApp.css';
import '../css/recipeForm.css';
import '../css/App.css';
import '../css/login.css';
import '../css/index.css';
import '../css/startpage.css';
import './showIngredients';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

reportWebVitals();
