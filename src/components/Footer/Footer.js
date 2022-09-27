import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";
const Footer = () => {
  return (
    <div class="container footer">
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p class="col-md-4 mb-0 text-muted">&copy; 2022 Capston CatchUp</p>

        <ul class="nav col-md-4 justify-content-end">
          <li class="nav-item">
            <Link to="#" class="nav-link px-2 text-muted">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link to="#" class="nav-link px-2 text-muted">
              Features
            </Link>
          </li>
          <li class="nav-item">
            <Link to="#" class="nav-link px-2 text-muted">
              FAQs
            </Link>
          </li>
          <li class="nav-item">
            <Link to="#" class="nav-link px-2 text-muted">
              About
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
