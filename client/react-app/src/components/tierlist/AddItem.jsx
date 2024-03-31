import React, { useState } from 'react';
import { addItem } from '../../services/TierListService';

function AddItem({ tierListId }) {
  const [itemName, setItemName] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  
  const handleSubmit = () => {
    addItem(tierListId, files, itemName);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={itemName} onChange={handleNameChange} placeholder="Nazwa itemu" />
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Dodaj item</button>
    </form>
  );
}

export default AddItem;
