import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Register.css';

const Register = () => {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setnameError('');
        setConfirmPasswordError('');
        let isValid = false;
        if (!name) {
            setnameError('Full Name is required');
            isValid = false;
        }
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        }
        if (!password || password.length > 6) {
            setPasswordError('Password is required and minimum length should be 6');
            isValid = false;
        }
        if (!confirmPassword || confirmPassword !== password) {
            setConfirmPasswordError('Confirm above password');
            isValid = false;
        }
        else {
            isValid = true;
            const existingData = localStorage.getItem('userInfo');
            let userData = existingData ? JSON.parse(existingData) : [];

            // Add the new user registration data to the array
            userData.push({ name, email, password });

            // Store the updated array back into local storage
            localStorage.setItem('userInfo', JSON.stringify(userData));
            setLoggedIn(true);
        }


    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {loggedIn ? (
                        <div className="text-center">
                            <Alert variant="success">Registration Successfull!</Alert>
                            <div>  Thank you for your registration</div>
                            <Link to="/login">Click Here to login</Link>
                        </div>
                    ) : (
                        <div >
                            <h2 className="mb-4 text-center">Register</h2>
                            <Form className="element-style" onSubmit={handleLogin}>

                                <Form.Group controlId="name">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter full name"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        isInvalid={!!nameError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {nameError}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!emailError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {emailError}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!passwordError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {passwordError}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        isInvalid={!!confirmPasswordError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {confirmPasswordError}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="text-center margin-style">
                                    <Button variant="btn btn-primary" type="submit">
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
