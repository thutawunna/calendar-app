import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class CreateAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }

        this.handleCreateAccount = this.handleCreateAccount.bind(this);
    }

    handleCreateAccount = async (event) => {
        event.preventDefault();
        const response = await fetch('../account/register', {
            method: 'post',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const responseJSON = await response.json();
        alert(responseJSON.message);

        this.setState({
            username: '',
            password: ''
        });

        window.location.href = "https://shielded-beach-58320.herokuapp.com";

        
    }

    render() {
        return (
            <>
            <div className="">
                <Form className="w-25 mx-auto my-auto" onSubmit={this.handleCreateAccount}>
                    <Form.Group className="mb-10 text-center">
                        <h2>Create an Account</h2>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control value={this.state.username} type="text" placeholder="Enter Username" onChange={event => this.setState({ username: event.target.value })}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control value={this.state.password} type="password" placeholder="Enter Password" onChange={event => this.setState({ password: event.target.value })}/>
                    </Form.Group>

                    <Form.Group className="mt-5 mb-3 text-center">
                        <Button className="w-100" variant="light-success" type="submit">Create</Button>
                    </Form.Group>
                </Form>
            </div>
            
            </>
        )
    }
}