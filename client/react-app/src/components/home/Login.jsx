import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../../services/AuthService';
import { Button, Form, Container } from 'react-bootstrap';
import Navbar from "../Navbar";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email,
            password
        };

        try {
            await login(formData);
            navigate('/');
        } catch (error) {
            console.error('Error while logging in:', error.response.data);
            setError(error.response.data); 
        }
    };


    return (
        <Container>
            <Navbar />
            <h1 className="mb-4">Zaloguj się </h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" className="btn btn-primary me-2" onClick={() => setShowToast(true)}>Login</Button>
            </Form>
        </Container>
    );
};

export default Login;
