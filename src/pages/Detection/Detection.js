import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "pages/HumanAction/humanAction.module.scss";
import "index.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Modal from "components/Modal/DetectionCCTVplayer";
// import Spinner from "./Spinner.js";
import { columnsforDetaction } from "assets/TableColumn.js";

import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator_bulma.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import warn from "assets/cctv1.png";
import dodbogi from "assets/dodbogi.png";
const { naver } = window;
var position = [
  new naver.maps.LatLng(37.562623, 127.083262),
  new naver.maps.LatLng(37.562026, 127.084997),
  // new naver.maps.LatLng(37.563058, 127.087702),
  // new naver.maps.LatLng(37.56143, 127.080287),
  // new naver.maps.LatLng(37.560518, 127.085579),
  // new naver.maps.LatLng(37.559542, 127.09011),
  // new naver.maps.LatLng(37.558323, 127.078625),
  new naver.maps.LatLng(37.55882, 127.083235),
  // new naver.maps.LatLng(37.556076, 127.086463),
];
const listGroup = [];
const Detection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [blur, setBlur] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
    setBlur(false);
  };
  const [id, setId] = useState();
  const [uri, setUri] = useState();

  const [list, setList] = useState([]);
  const container = useRef(null);
  const idParams = useParams();
  // const [pathList, setPathList] = useState([]);
  var pathList = [];
  console.log({ idParams });
  useEffect(() => {
    var map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.560518, 127.085579),
      zoom: 16,
      minZoom: 7, //지도의 최소 줌 레벨
      zoomControl: true, //줌 컨트롤의 표시 여부
      zoomControlOptions: {
        //줌 컨트롤의 옵션
        position: naver.maps.Position.TOP_LEFT,
      },
    });
    for (let i = 0; i < 3; i++) {
      pathList.push(position[i]);
      listGroup.push({
        id: i + 1,
        createdAt: "2022.10.24 22:1" + i + ":10",
        start_time: "2022.10.24 22:1" + i + ":10",
        url: " http://localhost:3000/frontend/local",
        cctv_id: i,
        // position:
        //   "( " + obj.cctv.position.x + ", " + obj.cctv.position.y + " )",
        // address: obj.cctv.address,
      });
      var marker = new naver.maps.Marker({
        map,
        title: "j",
        position: position[i],
        icon: {
          url: warn,
          size: new naver.maps.Size(50, 50),
          anchor: new naver.maps.Point(12, 37),
          // origin: new naver.maps.Point(i * 29, 0),
        },
        draggable: true,
        idValue: i,
        uriValue:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      });
      marker.addListener("click", function (e) {
        //obj.id로 api 요청
        console.log(e.overlay);
        setId(e.overlay.idValue);
        setUri(e.overlay.uriValue);
        setModalOpen(true);
        setBlur(true);
      });
    }

    new naver.maps.Polyline({
      map: map,
      path: pathList,
      endIconSize: 20,
      endIcon: naver.maps.PointingIcon.OPEN_ARROW,
      // endIcon: naver.maps.PointingIcon.DIAMOND,
      startIcon: naver.maps.PointingIcon.CIRCLE,
      // strokeStyle: "dot",
      strokeLineCap: "round",
      strokeWidth: "0.025",
      strokeLineJoin: "round",
      startIconSize: 10,
      strokeWeight: 8,
      strokeColor: "#2840a5",
      strokeOpacity: 0.8,
    });
    setList(listGroup);
    // setIsLoading(true);
    setIsLoading(false);
  }, []);
  console.log({ pathList });
  return (
    <div id="record">
      <Header />
      <main className="contents">
        <section className={blur ? styles.blur : ""}>
          <header>
            <h1>객체추적</h1>
          </header>
          {/* <Spinner /> */}
          <div className={styles.container}>
            <div id={"map"} ref={container} className={styles.map}></div>
            {isLoading ? (
              <div className={styles.spinner}>
                <img src={dodbogi} alt="돋보기" className={styles.dodbogi} />
                <h2>추적대상을 찾고 있습니다. 잠시만 기다려주세요.</h2>
              </div>
            ) : (
              <ReactTabulator columns={columnsforDetaction} data={list} />
            )}
          </div>
        </section>

        <Modal
          open={modalOpen}
          close={closeModal}
          header="CCTV 영상"
          id={id}
          uri={uri}
        ></Modal>
      </main>
      <Footer />
    </div>
  );
};

export default Detection;
