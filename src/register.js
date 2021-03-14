import { Component } from 'react';
//import {Button, Form, FormControl} from 'react-bootstrap-v5';
import { Form, Input, button } from "semantic-ui-react";
import {Container, Row} from "react-bootstrap-v5";
import './login.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        }
        this.register = this.register.bind(this);
    }

    async register() {
        const user = {'username': this.state.username, 'password': this.state.password};
        const response = await fetch(process.env.REACT_APP_APIURL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
                credentials: "include"
            }
        )
        if (response.ok) {
            this.state = {
                username: '',
                password: '',
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <Container>
                    <Form>
                        <Row>
                            <Form.Field className="recipe">username
                                <Input placeholder="username"
                                       value={this.state.username}
                                       onChange={event => this.setState({username: event.target.value})}/>
                            </Form.Field>
                        </Row>
                        <Row>
                            <Form.Field className="recipe">password
                                <Input placeholder="password"
                                       value={this.state.password}
                                       onChange={event => this.setState({password: event.target.value})}/>
                            </Form.Field>
                        </Row>
                        <Row>
                            <Form.Field>
                                <button onClick={this.register}>Register</button>
                            </Form.Field>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
};

export default Register;
