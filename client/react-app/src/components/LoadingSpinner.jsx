import { Spinner } from 'react-bootstrap';

export const LoadingSpinner = () => (
  <Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>
);