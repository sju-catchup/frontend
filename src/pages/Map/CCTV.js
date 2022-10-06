import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./map.module.scss";
import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import Footer from "components/Footer/Footer";
import { NaverMap, RenderAfterNavermapsLoaded, Marker } from "react-naver-maps";
import MapService from "lib/api/MapService";
// import response from "assets/data.json";
function CCTV() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // server;
    MapService.viewAllRecord()
      .then((response) => {
        console.log(response.data.CCTV);
        setData(response.data.CCTV);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    // //json
    // setData(response.CCTV);
    // setLoading(false);
    // console.log(response.CCTV);
  }, []);
  return (
    <div className={styles.Home}>
      <Header />
      <Sidebar />
      <main className="contents">
        <section>
          <header>
            <h1>전체 CCTV 위치</h1>
          </header>
          <div>
            {loading ? (
              ""
            ) : (
              <RenderAfterNavermapsLoaded ncpClientId={"14rlapbxs9"}>
                <NaverMap
                  id={"map"}
                  mapDivId={"react-naver-map"}
                  style={{ width: "100%", height: "650px" }}
                  defaultCenter={{ lat: 37.54948, lng: 127.07522 }}
                  defaultZoom={20}
                >
                  <>
                    {data.map((obj, i) => (
                      <Marker
                        key={i}
                        position={{
                          lat: parseFloat(obj.position.y),
                          lng: parseFloat(obj.position.x),
                        }}
                        animation={Animation.BOUNCE}
                        onClick={() => {
                          alert(obj.address);
                        }}
                      />
                    ))}
                  </>
                </NaverMap>
              </RenderAfterNavermapsLoaded>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CCTV;
