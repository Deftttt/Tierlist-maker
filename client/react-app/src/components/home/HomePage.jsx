import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

function Home() {
  return (
    <Container>
      <Navbar />
      <h1>Witaj na stronie głównej!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
        vestibulum sapien. Aliquam in nibh sed elit luctus lacinia. Morbi
        pulvinar dolor sit amet sapien dictum ultrices. Nullam consectetur
        eros quis orci fermentum, non ultricies lorem bibendum. Integer
        convallis, velit et efficitur dignissim, purus orci varius mauris,
        non tincidunt odio justo ac dui.
      </p>
      <div className="mt-4">
        <Link to="/tierlists/create">
          <Button variant="primary" className="me-2">
            Stwórz tierlistę
          </Button>
        </Link>
        <Link to="/tierlists/user/current">
          <Button variant="secondary">Moje tierlisty</Button>
        </Link>
      </div>
    </Container>
  );
}

export default Home;
