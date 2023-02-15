import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import "./App.css";
function App() {
  const [search, setSearch] = useState("");
  const [cities, setCity] = useState({});
  function HandleSearch(e) {
    setSearch(e.target.value);
  }
  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        "kanpur" +
        "&appid=" +
        "f56f24967aaf51182d1d4df628297c6d"
    )
      .then((res) => res.json())
      .then((data) => setCity(data));
  }, []);
  function HandleCity() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        search +
        "&appid=" +
        "f56f24967aaf51182d1d4df628297c6d"
    )
      .then((res) => res.json())
      .then((data) => setCity(data));
  }
  return (
    <div>
      {console.log(cities)}

      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand style={{ color: "white" }}>
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Weather App
          </Navbar.Brand>
        </Container>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={HandleSearch}
              />
              <Button variant="outline-success" onClick={HandleCity}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Card className="card">
        <Card.Body style={{ color: "white" }}>
          <Card.Title>{cities?.name}</Card.Title>
          <Card.Text>{cities?.sys?.country}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="item" style={{ color: "white" }}>
            {(cities?.main?.temp - 273.15).toFixed(2)}°C
          </ListGroup.Item>

          <ListGroup.Item className="item" style={{ color: "white" }}>
            RealFeel {(cities?.main?.feels_like - 273.15).toFixed(2)}°C
          </ListGroup.Item>
        </ListGroup>
        <Card.Body></Card.Body>
      </Card>
    </div>
  );
}
export default App;
