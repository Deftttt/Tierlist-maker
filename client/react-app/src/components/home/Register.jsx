import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../../services/AuthService';
import { Button, Form } from 'react-bootstrap';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [extraAtribute, setExtraAtribute] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email,
            password,
            passwordConfirm,
            extraAtribute
        };

        try {
            await register(formData);
            navigate('/');
        } catch (error) {
            console.error('Error while registering:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Zarejestruj się</h1>
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
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordConfirm">
                    <Form.Label>Potwierdź hasło</Form.Label>
                    <Form.Control
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="extraAtribute">
                    <Form.Label>Dodatkowe info</Form.Label>
                    <Form.Control
                        type="text"
                        value={extraAtribute}
                        onChange={(e) => setExtraAtribute(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" className="btn btn-primary me-2">Zarejestruj</Button>
            </Form>
        </div>
    );
};

export default Register;
