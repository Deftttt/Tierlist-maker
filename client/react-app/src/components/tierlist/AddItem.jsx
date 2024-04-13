import React, { useState } from 'react';
import { addItem } from '../../services/TierListService';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';

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
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label>Item Name</Form.Label>
        <FormControl type="text" value={itemName} onChange={handleNameChange} placeholder="Item name" />
      </FormGroup>
      <FormGroup>
        <Form.Label>Item Files</Form.Label>
        <FormControl type="file" multiple onChange={handleFileChange} />
      </FormGroup>
      <Button type="submit">Add Item</Button>
    </Form>
  );
}

export default AddItem;