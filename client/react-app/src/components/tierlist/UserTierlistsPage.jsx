import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Alert, Button } from 'react-bootstrap';
import { getTierlistsForUser, deleteTierListById } from '../../services/TierListService';
import { getUserById } from '../../services/UserService';
import Navbar from "../Navbar";
import { LoadingSpinner } from '../LoadingSpinner';
import { Trash } from 'react-bootstrap-icons';


function TierlistsPage() {
    const navigate = useNavigate(); 
    const { userId } = useParams();
    const [tierlists, setTierlists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const deleteTierList = async (id) => {
      try {
        await deleteTierListById(id);
        setTierlists(tierlists.filter(tierlist => tierlist.id !== id));
      } catch (error) {
        console.error('Error deleting tierlist:', error);
      }
    };
  
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
        <Navbar/>
        <h1 className="pb-3">User's tier list {user?.email}</h1>
        {loading ? (<LoadingSpinner/>) : tierlists.length === 0 ? (
          <><Alert variant="info">There are no tierlists to display.</Alert><Link to="/tierlists/create">
            <Button variant="primary" className="me-2">
              Create new tierlist
            </Button>
          </Link></>) : 
          (
          <Row>
            <Col>
            <ListGroup>
              {tierlists.map(tierlist => (
                <ListGroup.Item 
                  key={tierlist.id} 
                  className="d-flex justify-content-between align-items-center mb-3 shadow"
                >
                  <Link 
                    to={`/tierlists/${tierlist.id}`} 
                    className="text-decoration-none text-dark flex-grow-1 text-truncate pr-3"
                  >
                    <li className="py-1"><strong>{tierlist.name}</strong></li>
                  </Link>
                  <Button 
                    variant="danger" 
                    onClick={() => deleteTierList(tierlist.id)}
                  >
                    <Trash /> {}
                  </Button>
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