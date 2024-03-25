import React, { useState, useEffect } from 'react';
import { updateUser, getUserById } from '../../services/UserService';

function UserUpdateForm({ userId }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    extraAtribute: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserById(userId);
        const userData = response.data;

        setFormData({
          email: userData.email,
          password: '', 
          role: userData.role,
          extraAtribute: userData.extraAtribute,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

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
      const response = await updateUser(userId, formData);
      console.log('User updated successfully:', response.data);
      // Dodaj kod obsługujący potwierdzenie aktualizacji użytkownika
    } catch (error) {
      console.error('Error updating user:', error);
      // Dodaj kod obsługujący błąd aktualizacji użytkownika
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <label>Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
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
      <button type="submit">Update User</button>
    </form>
  );
}

export default UserUpdateForm;
