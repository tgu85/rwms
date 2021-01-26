import React from 'react';
import { List, Header } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

export const Recipes = ({ recipes }) => {
    return (
        <div>
            {recipes.map(recipe => {
                return (
                    <List key={recipe.title}>
                        <Header>{recipe.title}</Header>
                    </List>
                )
            })}
        </div>
    )
};
