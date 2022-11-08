import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "react-bootstrap/Navbar";
import "./header.scss";
const BASE_URL = process.env.PUBLIC_URL;
const Header = () => {
  return (
    <div>
      <div className="header-empty-space"></div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="header-container"
      >
        <Container className="header-inner-container">
          <Navbar.Brand href={BASE_URL} className="fs-3">
            CatchUp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="/record" className="p-3">
                기록 조회
              </Nav.Link>
              <Nav.Link href="/map/cctv" className="p-3">
                지도
              </Nav.Link>
              <Nav.Link href={BASE_URL + "/human-action"} className="p-3">
                HumanAction
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/login" className="p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
