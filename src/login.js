import { Component } from 'react';
//import {Button, Form, FormControl} from 'react-bootstrap-v5';
import { Form, Input, button } from "semantic-ui-react";
import {Container} from "react-bootstrap-v5";
import './login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        }
        this.login = this.login.bind(this);
    }

    async login() {
        const user = {'username': this.state.username, 'password': this.state.password};
        const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
        )
        if (response.ok) {
            console.log ("ok");
            }
        }

    render() {
    return (
        <div>
            <h1>Login</h1>
            <Container>
            <Form>
                <Form.Field>username
                    <Input placeholder="username"
                           value={this.state.username}
                           onChange={event => this.setState({username: event.target.value})}/>
                </Form.Field>
                <Form.Field>password
                    <Input placeholder="password"
                           value={this.state.password}
                           onChange={event => this.setState({password: event.target.value})}/>
                </Form.Field>
                <Form.Field>
                    <button onClick={this.login}>Login</button>
                </Form.Field>
            </Form>
            </Container>
        </div>
    )
}
};

export default Login;
