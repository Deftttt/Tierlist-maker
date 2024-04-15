import React, { useState, useEffect } from 'react';
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { getToken, getUserIdFromToken } from "../../services/AuthService";
import { getUserById } from '../../services/UserService';


function Home() {
  const isLoggedIn = getToken();
  const userId = getUserIdFromToken();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
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
           <Button variant="secondary">Show my profile</Button>
          </Link>
        </div>
      )}
    </Container>
  );
}

export default Home;
