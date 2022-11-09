import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import styles from "pages/HumanAction/humanAction.module.scss";
import "index.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
// import { ReactTabulator } from "react-tabulator";
const { naver } = window;
var list = [
  new naver.maps.LatLng(37.359924641705476, 127.1148204803467),
  new naver.maps.LatLng(37.36343797188166, 127.11486339569092),
  new naver.maps.LatLng(37.368520071054576, 127.11473464965819),
  new naver.maps.LatLng(37.3685882848096, 127.1088123321533),
  new naver.maps.LatLng(37.37295383612657, 127.10876941680907),
  new naver.maps.LatLng(37.38001321351567, 127.11851119995116),
  new naver.maps.LatLng(37.378546827477855, 127.11984157562254),
  new naver.maps.LatLng(37.376637072444105, 127.12052822113036),
  new naver.maps.LatLng(37.37530703574853, 127.12190151214598),
  new naver.maps.LatLng(37.371657839593894, 127.11645126342773),
  new naver.maps.LatLng(37.36855417793982, 127.1207857131958),
];
const Detection = () => {
  const container = useRef(null);
  const idParams = useParams();
  // const [pathList, setPathList] = useState([]);
  var pathList = [];
  console.log({ idParams });
  useEffect(() => {
    var map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.3674001, 127.1181196),
      zoom: 14,
    });
    for (let i = 0; i < 10; i++) {
      pathList.push(list[i]);
    }
    new naver.maps.Polyline({
      map: map,
      path: pathList,
    });
  }, []);
  console.log({ pathList });
  return (
    <div id="record">
      <Header />
      <main className="contents">
        <section>
          <header>
            <h1>객체추적</h1>
          </header>
          <div className={styles.container}>
            <div id={"map"} ref={container} className={styles.map}></div>

            {/* <ReactTabulator columns={columns} data={list} /> */}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Detection;
