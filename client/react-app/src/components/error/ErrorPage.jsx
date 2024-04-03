import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';

function ErrorPage() {
  return (
    <Container className="mt-4">
      <Alert variant="danger" >
        <Alert.Heading>Błąd</Alert.Heading>
        <p>Wystąpił błąd podczas przetwarzania żądania.</p>
        <hr />
        <p className="mb-0">
          Wróć do <Link to="/">strony głównej</Link>.
        </p>
      </Alert>
    </Container>
  );
}

export default ErrorPage;