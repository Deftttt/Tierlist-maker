import React, { useState } from 'react';
import { createTierList } from '../../services/TierListService';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

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
      <h1>Utwórz nową tierlistę</h1>
      <Form>
        <Form.Group controlId="tierListName" className="mb-3">
          <Form.Label>Nazwa tierlisty</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wprowadź nazwę tierlisty"
            value={tierListName}
            onChange={(e) => setTierListName(e.target.value)}
            isInvalid={error?.errors?.name}
          />

          <Form.Control.Feedback type="invalid">
              {error?.errors?.name}
          </Form.Control.Feedback>
          
        </Form.Group>
        <Button variant="primary" onClick={handleCreateTierList}>
          Stwórz tierlistę
        </Button>
      </Form>
      </Container>
  );
};

export default CreateTierListPage;
