import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./Home.module.scss";
import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import Footer from "components/Footer/Footer";
import { io } from "socket.io-client";

function Home() {
  const socket = io("localhost:5000/", {
    transports: ["websocket"],
  });
  socket.connect();
  // client-side
  socket.on("connect", () => {
    console.log("socket connected" + socket.id); // x8WIv7-mJelg7on_ALbx
  });
  socket.on("test", () => {
    console.log("test");
  });
  socket.on("test", () => {
    console.log("test");
  });
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
