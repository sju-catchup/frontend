import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./Home.module.scss";
import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import Footer from "components/Footer/Footer";

function Home() {
  return (
    <div className={styles.Home}>
      <Header />
      <Sidebar />
      <main className="contents">
        <section>
          <header>
            <h1>홈페이지</h1>
          </header>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
