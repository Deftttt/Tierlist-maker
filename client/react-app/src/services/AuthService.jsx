import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/auth', 
});


export const login = (loginData) =>{
  return api
    .post("/login", loginData, {headers: { 'Content-type': 'application/json' }})
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
      }

      return response.data;
    });
}

export const register = (registerData) =>{
  return api
    .post("/signup", registerData, {headers: { 'Content-type': 'application/json' }})
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
      }

      return response.data;
    });
}

export const logout = () => {
  localStorage.removeItem("accessToken");
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("accessToken"));
};

export const authHeader = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  if (token) {
       return { Authorization: "Bearer " + token }; 
  } else {
    return {};
  }
}