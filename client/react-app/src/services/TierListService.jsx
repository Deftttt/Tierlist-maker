import axios from 'axios';
import {authHeader} from './AuthService'

const api = axios.create({
  baseURL: 'http://localhost:8080/tierlists', 
});

export const geTierListById = (tierlistId) => api.get(`/${tierlistId}`, { headers: authHeader()});

export const getTierlistsForUser = (userId = 'current') => {
  if (userId === 'current') {
    return api.get(`/user/current`, { headers: authHeader() });
  } else {
    return api.get(`/user/${userId}`, { headers: authHeader() });
  }
};

export const addTier = (tierListId, tierName) => {
  console.log("ADD NEW TIER ", tierName);  
  
  return api.post(`/${tierListId}/tier`, {name: tierName}, { headers: authHeader() });
};

export const createTierList = (tierListName) => {
  return api.post(``, {name: tierListName}, { headers: authHeader() });
};

export const updateTierList = (tierlistId, tierlistData) => {
  const tierlistDto = mapToTierListDto(tierlistData);
  console.log("SAVING ", tierlistDto);  

  return api.put(`/${tierlistId}`, tierlistDto, { headers: authHeader() });
};


const mapToTierListDto = (tierlistData) => {

  const tierlistDto = {
    name: tierlistData.name,
    tiers: Object.values(tierlistData.tiers)
  };
  return tierlistDto;
};