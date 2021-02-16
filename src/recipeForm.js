import React, { useState } from 'react';
import {Button, Form, Input, Rating} from 'semantic-ui-react';

export const RecipeForm = ({onNewRecipe}) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(1);

    return (
        <Form>
            <Form.Field>
                <Input placeholder="Recipe Name"
                       value={name}
                       onChange={event => setName(event.target.value)} />
            </Form.Field>
            <Form.Field>
                <Rating icon='heart'
                       maxRating={3}
                        defaultRating={1}
                       onRate={(_, data) => {
                           setRating(data.rating);
                       }} />
            </Form.Field>
            <Form.Field>

                <Button onClick={ async () => {
                    const recipe = {name, rating};
                    const response = await fetch('/createRecipe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application.json'
                        },
                        body: JSON.stringify(recipe)
                    })

                    if (response.ok) {
                        console.log('response worked');
                        setName('');
                        setRating(1);
                    }
                }}>Add Recipe</Button>
            </Form.Field>
        </Form>
    )
};