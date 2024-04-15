import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../../services/AuthService';
import { Button, Form, Container, Alert, Row, Col } from 'react-bootstrap';
import Navbar from "../../components/Navbar";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            <h1 className="mb-4 text-center">Zaloguj się </h1>

            {showAlert && (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>Błąd przy logowaniu</Alert.Heading>
                <p>{error.message}</p>
            </Alert>
            )}
              <Row className="justify-content-center">
                 <Col xs={12} md={6}>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" name="email" value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        isInvalid={!!error?.errors?.email} />
                        <Form.Control.Feedback type="invalid">
                            {error?.errors?.email}
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" name="password" value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        isInvalid={!!error?.errors?.password} />
                        <Form.Control.Feedback type="invalid">
                            {error?.errors?.password}
                        </Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                        <Button type="submit" className="btn btn-primary btn-lg me-2 mt-3" onClick={() => setShowToast(true)}>
                            Login
                        </Button>
                        </div>
                    </Form>

                </Col>
            </Row>
        </Container>
    );
};

export default Login;
