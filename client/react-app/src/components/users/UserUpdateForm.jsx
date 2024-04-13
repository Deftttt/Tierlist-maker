import React, { useState, useEffect } from 'react';
import { updateUser, getUserById } from '../../services/UserService';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';


function UserUpdateForm() {
  const [validated, setValidated] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    extraAtribute: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserById(userId);
        const userData = response.data;

        setFormData({
          email: userData.email,
          password: '', 
          role: userData.role,
          extraAtribute: userData.extraAtribute,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await updateUser(userId, formData);
        navigate(`/users/${userId}`);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  
    setValidated(true);
  };
  
  return (
    <Container>
      <Navbar />
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
        <h1 className="text-center mb-4">Update User</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
  
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
  
            <Form.Group controlId="formExtraAtribute">
              <Form.Label>Extra atribute:</Form.Label>
              <Form.Control type="text" name="extraAtribute" value={formData.extraAtribute} onChange={handleChange} required />
            </Form.Group>
  
            <div className="pt-3 text-center">
            <Button variant="primary" type="submit">
              Update User
            </Button>
          </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserUpdateForm;
