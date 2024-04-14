import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/UserService';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { LoadingSpinner } from '../LoadingSpinner';


function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleBackClicked = () => {
    navigate('/');
  };

  return (
    <Container>
      <Navbar />
      <h1>User List</h1>
      {loading ? (<LoadingSpinner/>) : users.length === 0 ? (
        <Alert variant="info">
          No users to display.
        </Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                <td>{user.id}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );

};

export default UserList;