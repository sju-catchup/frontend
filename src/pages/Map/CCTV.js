import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./cctv.scss";
import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import Footer from "components/Footer/Footer";

import warn from "assets/warn.png";

import MapService from "lib/api/HttpsService";
// import response from "assets/data.json";
const { naver } = window;
function CCTV() {
  const [data, setData] = useState([]);
  const container = useRef(null);
  const options = {
    center: new naver.maps.LatLng(37.54948, 127.07522),
    level: 3,
  };
  useEffect(() => {
    // server;
    MapService.viewAllRecord()
      .then((response) => {
        console.log(response.data.CCTV);
        setData(response.data.CCTV);
      })
      .catch((error) => {
        console.log(error);
      });

    //json
    // console.log(response.CCTV);

    const map = new naver.maps.Map(container.current, options);
    //cctv 위치
    console.log(data);
    data.map((e) => {
      const markerPosition = new naver.maps.LatLng(
        parseFloat(e.position.y),
        parseFloat(e.position.x)
      );
      new naver.maps.Marker({
        map,
        title: "Green",
        position: markerPosition,
        icon: {
          content: [
            '<div className="cs_mapbridge" id="cctv_marker" >',
            e.id,
            "</div>",
          ].join(""),
          size: new naver.maps.Size(10, 10),
          anchor: new naver.maps.Point(19, 58),
        },
        draggable: true,
      });
    });
    //warn
    const location = [[37.54918, 127.0722]];
    location.map((e) => {
      const markerPosition = new naver.maps.LatLng(e[0], e[1]);
      new naver.maps.Marker({
        map,
        position: markerPosition,
        icon: {
          url: warn,
          size: new naver.maps.Size(50, 52),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
        },
      });
    });
  }, []);
  return (
    <div className="home">
      <Header />
      <Sidebar />
      <main className="contents">
        <section>
          <header>
            <h1>이상행동 탐지</h1>
          </header>
          <div>
            <div className="container">
              <div id={"map"} ref={container} className="map"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CCTV;
