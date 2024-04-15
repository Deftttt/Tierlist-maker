import React, { useState } from 'react';
import { addUser } from '../../services/UserService';

function UserAddForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '', 
    extraAtribute: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addUser(formData);
      console.log('User added successfully:', response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <label>Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <br />
      <label>Role:
        <input type="text" name="role" value={formData.role} onChange={handleChange} required />
      </label>
      <br />
      <label>Extra Attribute:
        <input type="text" name="extraAtribute" value={formData.extraAtribute} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserAddForm;