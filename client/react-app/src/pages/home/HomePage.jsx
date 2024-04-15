import React, { useState, useEffect } from 'react';
import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getToken, getUserIdFromToken, getUserRolesFromToken } from "../../services/AuthService";
import { getUserById } from '../../services/UserService';


function Home() {
  const isLoggedIn = getToken();
  const userId = getUserIdFromToken();
  const userRoles = getUserRolesFromToken();
  const isAdmin = userRoles?.includes('ADMIN');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const response = await getUserById(userId); 
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/error');
      }
    };
  
    fetchUser();
  }, [userId]);

  return (
    <Container>
      <Navbar />
      {isLoggedIn ? (
      <><h1>Welcome to the home page!</h1>
      <h4>Logged in as {user?.email}!</h4></>
      ) : (
        <h1>Welcome to the home page!</h1>
      )}
      <p>
      Create your new tierlist or browse existing ones by selecting the appropriate option from the menu below.
      </p>
      {isLoggedIn && (
        <div className="mt-4">
          <Link to="/tierlists/create">
            <Button variant="primary" className="me-2">
              Create new tierlist
            </Button>
          </Link>
          <Link to={`/users/${userId}`}>
           <Button variant="secondary" className="me-2">Show my profile</Button>
          </Link>
          {isAdmin && (
            <Link to={`/users`}>
            <Button variant="warning" className="me-2">Show users list</Button>
            </Link>
            
          )}
        </div>
      )}
    </Container>
  );
}

export default Home;
