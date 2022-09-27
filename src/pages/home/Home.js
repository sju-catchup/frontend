import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./home.module.scss";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

function Home() {
  return (
    <div className={styles.Home}>
      <Header />
      <Sidebar />
    </div>
  );
}

export default Home;
