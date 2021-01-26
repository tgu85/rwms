import React from 'react';
import React, { useEffect, useState } from 'react';
import { Recipes } from "./Recipes";
import { recipeForm} from "./recipeForm";
import 'semantic-ui-css/semantic.min.css';

function Test () {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('/recipes').then(response =>
            response.json().then(data => {
                setRecipes(data.recipes);
            }))
    }, []);

    return (
        <div >
            <Container>
            <RecipeForm onNewRecipe ={recipe =>
                setRecipes(currentRecipes => [recipe, ...currentRecipes])} />
            <Recipes recipes={recipes} />
            </Container>
        </div>
    )
};

export default Test;
