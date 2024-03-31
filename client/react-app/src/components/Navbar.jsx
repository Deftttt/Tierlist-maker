import React from "react";
import { Button, Navbar as BootstrapNavbar } from "react-bootstrap";
import { getToken, logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom"; 

function Navbar() {
  const isLoggedIn = getToken();
  const navigate = useNavigate();

  const handleLoginClicked = () => {
    navigate("/auth/login");
  };

  const handleLogoutClicked = () => {
    logout();
    navigate("/");
  };


  return (
    <BootstrapNavbar bg="light" expand="lg">
      <BootstrapNavbar.Brand href="/">My App</BootstrapNavbar.Brand>
      <ul className="navbar-nav ml-auto">
        {isLoggedIn ? (
          <li className="nav-item">
            <Button variant="primary" onClick={handleLogoutClicked}>
              Wyloguj się
            </Button>
          </li>
        ) : (
          <li className="nav-item">
            <Button variant="primary" onClick={handleLoginClicked}>
              Zaloguj się
            </Button>
          </li>
        )}
      </ul>
    </BootstrapNavbar>
  );
}

export default Navbar;