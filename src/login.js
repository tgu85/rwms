import { Component } from 'react';
import {Button, Form, FormControl} from 'react-bootstrap-v5';

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
            <Form>
                <Form.Row>username
                    <FormControl placeholder="username"
                           value={this.state.username}
                           onChange={event => this.setState({username: event.target.value})}/>
                </Form.Row>
                <Form.Row>password
                    <FormControl placeholder="password"
                           value={this.state.password}
                           onChange={event => this.setState({password: event.target.value})}/>
                </Form.Row>
                <Form.Group>
                    <Button onClick={this.login}>Login</Button>
                </Form.Group>
            </Form>
        </div>
    )
}
};

export default Login;
