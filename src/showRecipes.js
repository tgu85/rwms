import React, { useEffect, useState, Container } from 'react';
import { Recipes } from "./components/Recipes";
import { RecipeForm} from "./recipeForm";
import 'semantic-ui-css/semantic.min.css';

export const ShowRecipes = function Test () {
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        fetch('/recipes').then(response =>
            response.json().then(data => {
                setRecipe(data.recipe);
            }))
    }, []);

    return (
        <div >
            <Container>
            <RecipeForm onNewRecipe ={recipe =>
                setRecipe(currentRecipes => [recipe, ...currentRecipes])} />
            <Recipes recipe={recipe} />
            </Container>
        </div>
    )
};

