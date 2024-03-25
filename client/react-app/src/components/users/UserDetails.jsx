import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import UserUpdateForm  from "./UserUpdateForm";
import { getUserById, deleteUser } from '../../services/UserService';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await deleteUser(id);
      navigate('/users')
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };




  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={handleDelete}>Delete User</button>

      <UserUpdateForm userId={user.id}/>
    </div>
  );
};

export default UserDetails;