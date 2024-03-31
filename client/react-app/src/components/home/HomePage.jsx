import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../Navbar";

function Home() {

  return (
      <Container className="mt-5">
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
      </Container>
  );
}

export default Home;
