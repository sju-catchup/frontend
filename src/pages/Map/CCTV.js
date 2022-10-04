import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./map.module.scss";
import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import Footer from "components/Footer/Footer";
import { NaverMap, RenderAfterNavermapsLoaded, Marker } from "react-naver-maps";
function CCTV() {
  return (
    <div className={styles.Home}>
      <Header />
      <Sidebar />
      <main className="contents">
        <section>
          <header>
            <h1>CCTV</h1>
          </header>
          <div>
            <RenderAfterNavermapsLoaded ncpClientId={"14rlapbxs9"}>
              <NaverMap
                id={"map"}
                mapDivId={"react-naver-map"}
                style={{ width: "100%", height: "650px" }}
                defaultCenter={{ lat: 37.551971, lng: 127.06933 }}
                defaultZoom={15}
              >
                <Marker
                  position={{ lat: 37.551971, lng: 127.06933 }}
                  animation={Animation.BOUNCE}
                  onClick={() => {
                    alert("");
                  }}
                />
                <Marker
                  position={{ lat: 37.550796, lng: 127.072266 }}
                  animation={Animation.BOUNCE}
                  onClick={() => {
                    alert("");
                  }}
                />
              </NaverMap>
            </RenderAfterNavermapsLoaded>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CCTV;
