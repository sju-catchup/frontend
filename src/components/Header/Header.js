import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./header.scss";

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
          <Navbar.Brand href="/" className="fs-3">
            CatchUp
          </Navbar.Brand>
          {/* <Link to="/">智</Link> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="/record" className="p-3">
                기록 조회
              </Nav.Link>
              <Nav.Link href="/record" className="p-3">
                Ipsum
              </Nav.Link>
              <Nav.Link href="/record" className="p-3">
                Lorem
              </Nav.Link>
              {/* <NavDropdown
                title="language"
                id="collasible-nav-dropdown"
                className="p-2 fs-10"
              >
                <NavDropdown.Item href="#action/3.1">Korean</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">English</NavDropdown.Item>
              </NavDropdown> */}
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
    //     </div>
    // </div>
  );
};

export default Header;
