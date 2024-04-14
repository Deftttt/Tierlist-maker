import axios from 'axios';
import {authHeader} from './AuthService'

const api = axios.create({
  baseURL: 'http://localhost:8080/tierlists', 
});

export const geTierListById = (tierlistId) => api.get(`/${tierlistId}`, { headers: authHeader()});

export const getTierlistsForUser = (userId = 'current') => {
  return api.get(`/user/${userId}`, { headers: authHeader() });
};

export const addTier = (tierListId, tierName) => {
  console.log("ADD NEW TIER ", tierName);  
  
  return api.post(`/${tierListId}/tier`, {name: tierName}, { headers: authHeader() });
};

export const createTierList = (tierListName) => {
  return api.post(``, {name: tierListName}, { headers: authHeader() });
};

export const deleteTierListById = (tierListId) => {
  return api.delete(`/${tierListId}`, { headers: authHeader()});
};

export const updateTierList = (tierlistId, tierlistData) => {
  const tierlistDto = mapToTierListDto(tierlistData);
  console.log("SAVING ", tierlistDto);  

  return api.put(`/${tierlistId}`, tierlistDto, { headers: authHeader() });
};

export const addItem = (tierListId, files, itemName) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  formData.append('itemName', itemName);

  return api.post(`/${tierListId}/items`, formData, {
    headers: {
      ...authHeader()
    }
  });
};

const mapToTierListDto = (tierlistData) => {

  const tierlistDto = {
    name: tierlistData.name,
    tiers: Object.values(tierlistData.tiers)
  };
  return tierlistDto;
};