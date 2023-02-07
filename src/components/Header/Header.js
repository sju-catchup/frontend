import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "react-bootstrap/Navbar";
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
        <Link to="/">CatchUp</Link>
      </Navbar>
    </div>
  );
};

export default Header;
