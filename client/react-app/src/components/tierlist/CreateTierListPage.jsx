import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import { createTierList } from '../../services/TierListService';
import { Button, Container, Form } from 'react-bootstrap';

const CreateTierListPage = () => {
  const [tierListName, setTierListName] = useState('');
  const [redirectToTierList, setRedirectToTierList] = useState(false);

  const handleCreateTierList = async () => {
    try {
      if (tierListName.trim() === '') {
        alert('Nazwa tierlisty nie może być pusta');
        return;
      }

      const response = await createTierList(tierListName);

      // Ustawiamy redirectToTierList na true, aby przekierować użytkownika po utworzeniu tierlisty
      setRedirectToTierList(true);
    } catch (error) {
      console.error('Błąd podczas tworzenia tierlisty:', error);
      alert('Wystąpił błąd podczas tworzenia tierlisty');
    }
  };

  if (redirectToTierList) {
    // Jeśli redirectToTierList jest true, przekierowujemy użytkownika do strony tierlisty
    return <redirect to={`/tierlist/${response.data.id}`} />;
  }

  return (
    <Container>
      <h1>Stwórz nową tierlistę</h1>
      <Form>
        <Form.Group controlId="tierListName">
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
    </Container>
  );
};

export default CreateTierListPage;