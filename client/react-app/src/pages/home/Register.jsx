import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../../services/AuthService';
import { Button, Form, Container, Alert, Row, Col } from 'react-bootstrap';
import Navbar from "../../components/Navbar"; 

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [extraAtribute, setExtraAtribute] = useState("");
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      }, [error]);

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
            <h1 className="mb-4 text-center">Zarejestruj się</h1>

            {showAlert && (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>Błąd przy rejestracji</Alert.Heading>
                <p>{error.message}</p>
            </Alert>
            )}
            <Row className="justify-content-center">
                 <Col xs={12} md={6}>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email:</Form.Label>
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
                        <Form.Group controlId="password">
                            <Form.Label>Hasło:</Form.Label>
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
                        <Form.Group controlId="passwordConfirm">
                            <Form.Label>Potwierdź hasło:</Form.Label>
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
                        <Form.Group controlId="extraAtribute">
                            <Form.Label>Dodatkowe info:</Form.Label>
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
                        <div className="d-flex justify-content-center">
                        <Button type="submit" className="btn btn-primary btn-lg me-2 mt-3" onClick={() => setShowToast(true)}>
                            Register
                        </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
