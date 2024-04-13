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
      <h1>Witaj na stronie głównej, {user?.email}!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
        vestibulum sapien. Aliquam in nibh sed elit luctus lacinia. Morbi
        pulvinar dolor sit amet sapien dictum ultrices. Nullam consectetur
        eros quis orci fermentum, non ultricies lorem bibendum. Integer
        convallis, velit et efficitur dignissim, purus orci varius mauris,
        non tincidunt odio justo ac dui.
      </p>
      {isLoggedIn && (
        <div className="mt-4">
          <Link to="/tierlists/create">
            <Button variant="primary" className="me-2">
              Stwórz tierlistę
            </Button>
          </Link>
          <Link to={`/tierlists/user/${userId}`}>
           <Button variant="secondary">Moje tierlisty</Button>
          </Link>
        </div>
      )}
    </Container>
  );
}

export default Home;
