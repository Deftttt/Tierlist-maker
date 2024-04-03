import React from 'react';
import UserList from './components/users/UserList';
import UserDetails from './components/users/UserDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/home/HomePage';
import AdminPage from './components/admin/AdminPage';
import Login from './components/home/Login';
import Register from './components/home/Register';
import TierListPage from './components/tierlist/TierListPage';
import UserTierListsPage from './components/tierlist/UserTierlistsPage';
import CreateTierListPage from './components/tierlist/CreateTierListPage';
import ErorPage from './components/error/ErrorPage';


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/error" exact element={<ErorPage />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/tierlists/:tierListId" element={<TierListPage />} />
            <Route path="/tierlists/user/current" element={<UserTierListsPage />} />
            <Route path="/tierlists/user/:userId" element={<UserTierListsPage />} />
            <Route path="/tierlists/create" element={<CreateTierListPage />} />
        </Routes>
    </BrowserRouter>
);
};

export default App;