import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleLogin = async (event) => {
        event.preventDefault();
        await fetch('/account/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if (Cookies.get('cali-app-authenticated')) {
            setToken(Cookies.get('cali-app-authenticated'));
            window.location.href = "/calendar";
        } else {
            window.location.href = "/";
        }
        
    }

    return (
        <>
        <Form className="w-25 mx-auto my-auto" onSubmit={handleLogin}>
            <Form.Group className="mb-3 text-center">
                <h1>Calendar-App</h1>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" onChange={event => setUsername(event.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={event => setPassword(event.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3 text-center">
                <Button className="w-100" variant="primary" type="submit">Login</Button>
            </Form.Group>
        </Form>
        </>
    )
}

export default Login;