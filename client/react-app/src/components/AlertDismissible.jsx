import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissible({ variant = 'success', heading='Alert title'}) {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant={variant}>
        <Alert.Heading>{heading}</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant={`outline-${variant}`}>
            Zamknij
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default AlertDismissible;
