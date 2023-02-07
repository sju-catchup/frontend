import React from "react";
const Footer = () => {
  return (
    <div className="container footer">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">&copy; 2022 Capston CatchUp</p>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <a
              href="https://github.com/sju-catchup"
              className="nav-link px-2 text-muted"
            >
              Github
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://www.notion.so/fourdori/CatchUP-57b171733a9c4ea4bebe1e4c40a5effd"
              className="nav-link px-2 text-muted"
            >
              Notion
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
