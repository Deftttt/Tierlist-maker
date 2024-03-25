import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/UserService';
import UserAddForm from './UserAddForm';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>"User List"</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.id} {user.email}</li>
        ))}
      </ul>
      <UserAddForm />
    </div>
  );

};

export default UserList;