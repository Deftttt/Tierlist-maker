import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../../services/AuthService';
import { Button, Form, Container } from 'react-bootstrap';
import Navbar from "../Navbar"; 
import Toast from 'react-bootstrap/Toast';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [extraAtribute, setExtraAtribute] = useState("");
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(true);
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
            console.error('Error while registering:', error.response.data);
            setError(error.response.data); 
        }
    };

    return (
        <Container>
        <Navbar />
            <h1 className="mb-4">Zarejestruj się</h1>

            {error && <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={"danger"}>
                <Toast.Header>
                    <strong className="me-auto">Błąd przy rejestracji</strong>
                </Toast.Header>
                <Toast.Body>{error.message}</Toast.Body>
            </Toast>
            }

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={error?.errors?.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error?.errors?.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={error?.errors?.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error?.errors?.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordConfirm">
                    <Form.Label>Potwierdź hasło</Form.Label>
                    <Form.Control
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    isInvalid={error?.errors?.passwordConfirm}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error?.errors?.passwordConfirm}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="extraAtribute">
                    <Form.Label>Dodatkowe info</Form.Label>
                    <Form.Control
                        type="text"
                        value={extraAtribute}
                        onChange={(e) => setExtraAtribute(e.target.value)}
                    isInvalid={error?.errors?.extraAtribute}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error?.errors?.extraAtribute}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="btn btn-primary me-2" onClick={() => setShowToast(true)}>Zarejestruj</Button>
            </Form>
        </Container>
    );
};

export default Register;
