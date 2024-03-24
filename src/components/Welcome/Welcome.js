import './Welcome.css';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();

    const loginFunc = () => {
        navigate('/login');
    }

    const registerFunc = () => {
        navigate('/register');
    }

    return (
        <div className="welcome">
            <h4>Welcome to User Module!!!</h4>
            <span>Existing User? Click below to login.</span>
            <Button variant="success" className='margin-style' onClick={loginFunc}>Login</Button>
            <span>Don't have an account? Click below to register.</span>
            <Button variant="primary" className='margin-style' onClick={registerFunc}>Register</Button>
        </div>
    );
}

export default Welcome;
