import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.js';
import './testApp.css';
import './recipeForm.css';
import './App.css';
import './login.css';
import './index.css';
import './startpage.css';
import './showIngredients';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


///If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
