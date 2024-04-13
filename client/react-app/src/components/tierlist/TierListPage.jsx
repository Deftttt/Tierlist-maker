import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import TierList from './TierList';
import AddItem from './AddItem';
import Navbar from "../Navbar";
import { Button, Form, Container } from 'react-bootstrap';
import { geTierListById, updateTierList, addTier, addItem } from '../../services/TierListService';

function TierListPage() {
  const navigate = useNavigate(); 
  const { tierListId } = useParams();
  const [tierListData, setTierListData] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [items, setItems] = useState([]);
  

  useEffect(() => {
    const fetchTierList = async () => {
      try {
        const response = await geTierListById(tierListId);
        setTierListData(response.data);
      } catch (error) {
        console.error('Error fetching tierlist:', error);
        navigate('/error');
      }
    };

    fetchTierList();
  }, [tierListId]);


  useEffect(()=> {
    saveTierListToDatabase();
  }, [tierListData])



  const saveTierListToDatabase = async () => {
    try {
      await updateTierList(tierListData.id, tierListData);
    } catch (error) {
      console.error('Błąd podczas zapisywania obiektu TierList do bazy danych:', error);
    }
  };

  
  const handleTierListNameChange = (newName) => {
    setTierListData(
      { ...tierListData, name: newName },
      );
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
    setTierListData({ ...tierListData, tiers: newTiers });
  };

  const handleAddTier = async (tierListId, tierName) => {
      const response = await addTier(tierListId, tierName);
      console.log(response.data.tiers);
      const updatedTiers = response.data.tiers;
      setTierListData({ ...tierListData, tiers: updatedTiers });
  };

  const handleItemAdded = (newItem) => {
    setItems(oldItems => [...oldItems, newItem]);
  };
  

  if (!tierListData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Navbar/>
      {tierListData ? (
        <TierList tierListData={tierListData} onTierListNameChange={handleTierListNameChange} onTierNameChange={handleTierNameChange} onItemsOrderChange={handleItemsOrderChange} onAddTier={handleAddTier}/>
      ) : (
        <p>Loading...</p>
      )}

      <AddItem tierListId={tierListData.id} onItemAdded={handleItemAdded}/>
      
    </Container>
  );
};

export default TierListPage;
//<button onClick={saveTierListToDatabase}>Zapisz</button>