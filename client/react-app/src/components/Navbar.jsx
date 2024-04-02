import React from "react";
import { Button, Navbar as BootstrapNavbar } from "react-bootstrap";
import { HouseDoorFill } from 'react-bootstrap-icons';
import { getToken, logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom"; 

function Navbar() {
  const isLoggedIn = getToken();
  const navigate = useNavigate();

  const handleLoginClicked = () => {
    navigate("/auth/login");
  };

  const handleRegisterClicked = () => {
    navigate("/auth/register");
  };

  const handleLogoutClicked = () => {
    logout();
    navigate("/");
  };


  return (
    <BootstrapNavbar expand="lg">
      <BootstrapNavbar.Brand href="/">
        <HouseDoorFill size={30} />
      </BootstrapNavbar.Brand>
      <ul className="navbar-nav ml-auto">
        {isLoggedIn ? (
          <li className="nav-item">
            <Button variant="primary" onClick={handleLogoutClicked}>
              Wyloguj się
            </Button>
          </li>
        ) : (
          <li className="nav-item">
            <Button variant="primary" className="mx-2" onClick={handleLoginClicked}>
              Zaloguj się
            </Button>
            <Button variant="secondary" className="mx-2" onClick={handleRegisterClicked}>
              Zarejestruj się
            </Button>
          </li>
        )}
      </ul>
    </BootstrapNavbar>
  );
}

export default Navbar;