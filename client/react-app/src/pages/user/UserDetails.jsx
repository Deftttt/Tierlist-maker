import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { getUserById } from '../../services/UserService';
import Navbar from '../../components/Navbar';


function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate(`/users/${user.id}/update`);
  };

  const handleShowTierlistClick = () => {
    navigate(`/tierlists/user/${user.id}`);
  };
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [userId]);



  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <Container>
      <Navbar/>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2>User Details</h2>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title>{user.email}</Card.Title>
              <Card.Text>
                Description: {user.extraAtribute}
              </Card.Text>
              <div className="d-flex justify-content-around mt-3">
                <Button variant="primary" onClick={handleUpdateClick}>Change data</Button>
                <Button variant="secondary" onClick={handleShowTierlistClick}>Show tierlists</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
  

};

export default UserDetails;