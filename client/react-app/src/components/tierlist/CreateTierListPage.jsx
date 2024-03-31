import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import { createTierList } from '../../services/TierListService';
import { Button, Container, Form } from 'react-bootstrap';

const CreateTierListPage = () => {
  const [tierListName, setTierListName] = useState('');
  const [redirectToTierList, setRedirectToTierList] = useState(false);
  const [tierListId, setTierListId] = useState(null);

  const handleCreateTierList = async () => {
    try {
      if (tierListName.trim() === '') {
        alert('Nazwa tierlisty nie może być pusta');
        return;
      }

      const response = await createTierList(tierListName);
      setTierListId(response.data.id);
      setRedirectToTierList(true);
    } catch (error) {
      console.error('Błąd podczas tworzenia tierlisty:', error);
      alert('Wystąpił błąd podczas tworzenia tierlisty');
    }
  };

  if (redirectToTierList) {
    return <redirect to={`/tierlist/${tierListId}`} />;
  }

  return (
    <div className="container mt-5">
      <h1>Utwórz nową tierlistę</h1>
      <Form>
        <Form.Group controlId="tierListName" className="mb-3">
          <Form.Label>Nazwa tierlisty</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wprowadź nazwę tierlisty"
            value={tierListName}
            onChange={(e) => setTierListName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCreateTierList}>
          Stwórz tierlistę
        </Button>
      </Form>
      </div>
  );
};

export default CreateTierListPage;
