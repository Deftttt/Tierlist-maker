import React from 'react';
import UserList from './pages/user/UserList';
import UserDetails from './pages/user/UserDetails';
import UserUpdateForm from './pages/user/UserUpdateForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/HomePage';
import Login from './pages/home/Login';
import Register from './pages/home/Register';
import TierListPage from './pages/tierlist/TierListPage';
import UserTierListsPage from './pages/tierlist/UserTierlistsPage';
import CreateTierListPage from './pages/tierlist/CreateTierListPage';
import ErorPage from './pages/ErrorPage';


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/error" exact element={<ErorPage />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<UserDetails />} />
            <Route path="/users/:userId/update" element={<UserUpdateForm />}/>
            <Route path="/tierlists/:tierListId" element={<TierListPage />} />
            <Route path="/tierlists/user/:userId" element={<UserTierListsPage />} />
            <Route path="/tierlists/create" element={<CreateTierListPage />} />
        </Routes>
    </BrowserRouter>
);
};

export default App;