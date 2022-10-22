/* eslint-disable react/react-in-jsx-scope */
// 코드
import { useEffect } from "react";

import styles from "./map.module.scss";
import warn from "assets/warn.png";
//const image1 = "https://picsum.photos/20/20";
const { naver } = window;
const Map = () => {
  useEffect(() => {
    var map = new naver.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: new naver.maps.LatLng(37.3614483, 129.1114883),
    });
    var latlngs = [
      new naver.maps.LatLng(37.3633324, 129.1054988),
      new naver.maps.LatLng(37.3632916, 129.1085015),
      new naver.maps.LatLng(37.3632507, 129.1115043),
      new naver.maps.LatLng(37.3632097, 129.114507),
      new naver.maps.LatLng(37.3631687, 129.1175097),
      new naver.maps.LatLng(37.3597282, 129.105422),
      new naver.maps.LatLng(37.3596874, 129.1084246),
      new naver.maps.LatLng(37.3596465, 129.1114272),
      new naver.maps.LatLng(37.3596056, 129.1144298),
      new naver.maps.LatLng(37.3595646, 129.1174323),
    ];
    var markerList = [];

    for (var i = 0, ii = latlngs.length; i < ii; i++) {
      var icon = {
          url: warn,
          size: new naver.maps.Size(24, 37),
          anchor: new naver.maps.Point(12, 37),
          origin: new naver.maps.Point(i * 29, 0),
        },
        marker = new naver.maps.Marker({
          position: latlngs[i],
          map: map,
          icon: icon,
        });

      marker.set("seq", i);

      markerList.push(marker);

      marker.addListener("mouseover", onMouseOver);
      marker.addListener("mouseout", onMouseOut);

      icon = null;
      marker = null;
    }
    function onMouseOver(e) {
      var marker = e.overlay,
        seq = marker.get("seq");

      marker.setIcon({
        url: warn,
        size: new naver.maps.Size(24, 37),
        anchor: new naver.maps.Point(12, 37),
        origin: new naver.maps.Point(seq * 29, 50),
      });
    }

    function onMouseOut(e) {
      var marker = e.overlay,
        seq = marker.get("seq");

      marker.setIcon({
        url: warn,
        size: new naver.maps.Size(24, 37),
        anchor: new naver.maps.Point(12, 37),
        origin: new naver.maps.Point(seq * 29, 0),
      });
    }
  }, []);
  return (
    <div className="container">
      <div id={"map"} className={styles.map}></div>
      <img src={warn} alt="reservation list" />
    </div>
  );
};

export default Map;
