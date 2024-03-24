import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUserData = localStorage.getItem('userInfo');
        if (storedUserData) {
            const registeredUsers = JSON.parse(storedUserData);
            // Check if entered email and password match any registered user
            const matchedUser = registeredUsers.find(user => user.email === email && user.password === password);
            if (matchedUser) {
                // Login successful
                setError('');
                setLoggedIn(true);
                localStorage.setItem('loggedUser', JSON.stringify({ email, password }))
            } else {
                // Login failed
                setError('Invalid email or password');
            }
        } else {
            setError('No registered users found');
        }
        console.log('Logging in with:', { email, password });


    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {loggedIn ? (
                        <div className="text-center">
                            <Alert variant="success">Logged in successfully!</Alert>
                            <div>  Welcome!!! {email}</div>
                            <Link to="/userMgmt">Click to return to Home page</Link>
                        </div>
                    ) : (
                        <div >
                            <h2 className="mb-4 text-center">Login</h2>
                            <Form className="element-style" onSubmit={handleLogin}>
                                <Form.Group controlId="basicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </Form.Group>
                                <div className="text-center margin-style">
                                    <Button variant="btn btn-primary" type="submit">
                                        Login
                                    </Button>
                                </div>
                                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}!!!</div>}
                            </Form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
