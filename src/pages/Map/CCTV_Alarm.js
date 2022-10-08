/* eslint-disable react/react-in-jsx-scope */
// 코드
import { useEffect, useRef } from "react";

import styles from "./map.module.scss";
import warn from "assets/warn.png";
//const image1 = "https://picsum.photos/20/20";
const { naver } = window;
const Map = () => {
  const container = useRef(null);
  const options = {
    center: new naver.maps.LatLng(37.56637787425258, 126.97827585270615),
    level: 5,
  };
  useEffect(() => {
    const map = new naver.maps.Map(container.current, options);
    const location = [
      [37.56637787425258, 126.97827585270615],
      [37.56606939560325, 126.9826002893739],
      [37.56581495896049, 126.9752617019476],
    ];
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
    <div className="container">
      <div id={"map"} ref={container} className={styles.map}></div>
      <img src={warn} alt="reservation list" />
    </div>
  );
};

export default Map;
