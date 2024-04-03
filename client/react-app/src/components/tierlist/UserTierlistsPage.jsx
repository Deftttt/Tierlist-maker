import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { getTierlistsForUser } from '../../services/TierListService';
import Navbar from "../Navbar";

function TierlistsPage() {
    const navigate = useNavigate(); 
    const { userId } = useParams();
    const [tierlists, setTierlists] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchTierlists = async () => {
        try {
          const response = await getTierlistsForUser(userId);
          console.log(response);
          setTierlists(response.data);
        } catch (error) {
          console.error('Error fetching tierlists:', error);
          navigate('/error');
        } finally {
          setLoading(false);
        }
      };
  
      fetchTierlists();
    }, [userId]);
  
    return (
      <Container>
        <Navbar/>
        <h1>Twoje tierlisty</h1>
        {loading ? (
          <p>Ładowanie...</p>
        ) : tierlists.length === 0 ? (
          <Alert variant="info">
            Użytkownik nie ma jeszcze żadnych tierlist.
          </Alert>
        ) : (
          <Row>
            <Col>
              <ListGroup>
                {tierlists.map(tierlist => (
                  <ListGroup.Item key={tierlist.id}>
                    <Link to={`/tierlists/${tierlist.id}`}>{tierlist.name}</Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
  
  export default TierlistsPage;