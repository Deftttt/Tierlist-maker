import React, { useState } from 'react';
import { addItem } from '../../services/TierListService';
import { Button, Form, FormGroup, FormControl, Container, Row, Col } from 'react-bootstrap';

function AddItem({ tierListId, onItemAdded }) {
  const [itemName, setItemName] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = await addItem(tierListId, files, itemName);
    onItemAdded(newItem);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="4">
          <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center mb-4">
            <FormGroup className="w-100">
              <Form.Label>Choose item name:</Form.Label>
              <FormControl type="text" value={itemName} onChange={handleNameChange} placeholder="Item name" />
            </FormGroup>
            <FormGroup className="w-100">
              <Form.Label>Load images:</Form.Label>
              <FormControl type="file" multiple onChange={handleFileChange} />
            </FormGroup>
            <Button type="submit" className="mt-3">Add Item</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );

}

export default AddItem;