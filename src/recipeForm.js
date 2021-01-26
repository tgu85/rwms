import React from 'react';
import {Button, Form, Input, Rating} from 'semantic-ui-react';

export const RecipeForm = ({onNewRecipe}) => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState(0);

    return (
        <Form>
            <Form.Field>
                <Input placeholder="Recipe Name"
                       value={name}
                       onChange={event => setName(event.target.value)} />
            </Form.Field>
            <Form.Field>
                <Rating icon='star'
                       rating={duration} maxRating={5}
                       onRate={(_, data) => {
                           setDuration(data.duration);
                       }} />
            </Form.Field>
            <Form.Field>
                //adding new recipes to the database

                <Button onClick={ async () => {
                    const recipe = {name, quantity, duration};
                    const response = await fetch('(addRecipe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application.json'
                        },
                        body: JSON.stringify(recipe)
                    })

                    if (response.ok) {
                        console.log('response worked');
                        onNewRecipe(recipe);
                        setName('');
                        setDuration(0);
                    }
                }}>Add Recipe</Button>
            </Form.Field>
        </Form>
    )
};