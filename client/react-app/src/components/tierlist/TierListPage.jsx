import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import TierList from './TierList';
import AddItem from './AddItem';
import Navbar from "../Navbar";
import { Button, Alert, Container } from 'react-bootstrap';
import { geTierListById, updateTierList, addTier, deleteTier } from '../../services/TierListService';
import { LoadingSpinner } from '../LoadingSpinner';

function TierListPage() {
  const navigate = useNavigate(); 
  const { tierListId } = useParams();
  const [loading, setLoading] = useState(true);
  const [tierListData, setTierListData] = useState(null);
  const [tierListName, setTierListName] = useState(tierListData?.name);
  const [error, setError] = useState(null);

  const fetchTierList = async () => {
    try {
      const response = await geTierListById(tierListId);
      setTierListData(response.data);
    } catch (error) {
      console.error('Error fetching tierlist:', error);
      navigate('/error');
    } finally {
      setLoading(false);
    }
  };

  const saveTierListToDatabase = async () => {
    try {
      console.log('Saving tierlist to database:', tierListData);  
      await updateTierList(tierListData.id, tierListData);
    } catch (error) {
      console.error('Error when saving tierlist to database:', error);
      setError(error.response.data); 
    }
  };

  useEffect(() => {
    fetchTierList();
  }, [tierListId]);

  
  useEffect(() => {
    saveTierListToDatabase();
  }, [tierListName]);



  
  const handleTierListNameChange = (newName) => { 
    setTierListName(newName);
    setTierListData( { ...tierListData, name: newName } );

  };
  

  const handleTierNameChange = (tierId, newName) =>  {
    const updatedTiers = Object.values(tierListData.tiers).map(tier => {
      if (tier.tierId === tierId) {
        return { ...tier, name: newName };
        }      return tier;
    });

    setTierListData({ ...tierListData, tiers: updatedTiers });
  };


  const handleItemsOrderChange = (newTiers) => {
    console.log(tierListData.tiers);
    setTierListData({ ...tierListData, tiers: newTiers });
  };

  const handleAddTier = async (tierListId, tierName) => {
      const response = await addTier(tierListId, tierName);
      console.log(response.data.tiers);
      const updatedTiers = response.data.tiers;
      setTierListData({ ...tierListData, tiers: updatedTiers });
  };

  const handleDeleteTier = async (tierId) => {
    const response = await deleteTier(tierListData.id, tierId);
    console.log(response.data.tiers);
    const updatedTiers = response.data.tiers;
    setTierListData({ ...tierListData, tiers: updatedTiers });
};

  const handleItemAdded = (newItem) => {
    fetchTierList();
  };
  

  if (!tierListData) {
    return (<Container><LoadingSpinner/></Container>);
  }

  return (
    <Container>
      <Navbar/>
      {error && <Alert variant="danger">{error.errors?.name}</Alert>}
      {loading ? (
        <LoadingSpinner/> 
      ) : (
        <TierList tierListData={tierListData} onTierListNameChange={handleTierListNameChange} onTierNameChange={handleTierNameChange} onItemsOrderChange={handleItemsOrderChange} onAddTier={handleAddTier} onDeleteTier={handleDeleteTier}/>
      )}
      <Button variant="success" size="lg" className="mx-auto d-block mb-2" onClick={saveTierListToDatabase}>Save tierlist</Button>
      <AddItem tierListId={tierListData.id} onItemAdded={handleItemAdded}/>
    </Container>
  );

};

export default TierListPage;