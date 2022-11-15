import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "pages/HumanAction/humanAction.module.scss";
import "index.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import dodbogi from "assets/dodbogi.png";
const { naver } = window;
const Detection = () => {
  const idParams = useParams();
  // const [pathList, setPathList] = useState([]);
  var pathList = [];
  console.log({ idParams });
  useEffect(() => {
    new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.560518, 127.085579),
      zoom: 16,
      minZoom: 7, //지도의 최소 줌 레벨
      zoomControl: true, //줌 컨트롤의 표시 여부
      zoomControlOptions: {
        //줌 컨트롤의 옵션
        position: naver.maps.Position.TOP_LEFT,
      },
    });
  }, []);
  console.log({ pathList });
  return (
    <div id="record">
      <Header />
      <main className="contents">
        <section className={styles.loading}>
          <header></header>
          <div className={styles.container}>
            <img src={dodbogi} alt="돋보기" className={styles.dodbogi} />
            <div id={"map"} className={styles.map}></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Detection;
