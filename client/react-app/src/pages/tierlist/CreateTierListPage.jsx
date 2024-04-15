import React, { useState } from 'react';
import { createTierList } from '../../services/TierListService';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const CreateTierListPage = () => {
  const [tierListName, setTierListName] = useState('');
  const [tierListId, setTierListId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateTierList = async () => {
    try {
      const response = await createTierList(tierListName);
      setTierListId(response.data.id);
      navigate(`/tierlists/${response.data.id}`);
    } catch (error) {
      console.error('Error while creating tierlist:', error.response.data);
      setError(error.response.data); 
    }
  };


  return (
    <Container>
      <Navbar/>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="d-flex flex-column align-items-center">
            <h1 className="text-center mb-4">Create new tierlist</h1>
            <Form className="w-100">
              <Form.Group controlId="tierListName" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter tierlist name"
                  value={tierListName}
                  onChange={(e) => setTierListName(e.target.value)}
                  isInvalid={error?.errors?.name}
                />
  
                <Form.Control.Feedback type="invalid">
                    {error?.errors?.name}
                </Form.Control.Feedback>
                
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" onClick={handleCreateTierList}>
                  Create tierlist
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTierListPage;
