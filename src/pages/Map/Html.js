/* eslint-disable react/react-in-jsx-scope */
// 코드
import { useEffect, useRef } from "react";

import "./cctv.scss";
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
    location.map((e, i) => {
      const markerPosition = new naver.maps.LatLng(e[0], e[1]);
      new naver.maps.Marker({
        map,
        title: "Green",
        position: markerPosition,
        icon: {
          content: [
            '<div class="cs_mapbridge">',
            '<div class="map_group _map_group crs">',
            '<div class="map_marker _marker num1 num1_big"> ',
            '<span class="ico _icon"></span>',
            i,
            '<span class="shd"></span>',
            "</div>",
            "</div>",
            "</div>",
          ].join(""),
          size: new naver.maps.Size(38, 58),
          anchor: new naver.maps.Point(19, 58),
        },
        draggable: true,
      });
    });
  }, []);
  return (
    <div className="container">
      <div id={"map"} ref={container} className="map"></div>
      <img src={warn} alt="reservation list" />
    </div>
  );
};

export default Map;
