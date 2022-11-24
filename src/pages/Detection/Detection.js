import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator_bulma.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

import "index.scss";
import styles from "pages/HumanAction/humanAction.module.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Modal from "components/Modal/DetectionCCTVplayer";
import dodbogi from "assets/dodbogi.png";
import {
  columnsforDetaction,
  initialSortforDetaction,
} from "assets/TableColumn.js";
import {
  setTable,
  setPath,
  setMarker,
  setPolyline,
} from "lib/utils/forDetection";
// import HttpsService from "lib/api/HttpsService";
import response from "assets/data.json";

const { naver } = window;
const listGroup = [];
const Detection = () => {
  const container = useRef(null);
  const { idParams, suspectId, suspectImgUrl } = useParams();
  console.log({ idParams, suspectId, suspectImgUrl });
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [blur, setBlur] = useState(false);
  const [id, setId] = useState();
  const [uri, setUri] = useState();
  const [list, setList] = useState([]);
  const lastest = [];
  var map,
    detectionOrder = 1;
  var isDuplicate = false;
  const a = useLocation();
  console.log(a);
  const imgurl = a.state.suspectImgUrl;
  console.log(imgurl);
  const closeModal = () => {
    setModalOpen(false);
    setBlur(false);
  };

  useEffect(() => {
    map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.560518, 127.085579),
      zoom: 16,
      minZoom: 7, //지도의 최소 줌 레벨
      zoomControl: true, //줌 컨트롤의 표시 여부
      zoomControlOptions: {
        //줌 컨트롤의 옵션
        position: naver.maps.Position.TOP_LEFT,
      },
    });
    // if (listGroup.length === 0) {
    listGroup.push(setTable(response.findHumanAction, detectionOrder));
    lastest.push(setPath(response.findHumanAction));
    setMarker(
      map,
      response.findHumanAction,
      response.findHumanAction.id,
      response.findHumanAction.uri,
      detectionOrder++
    );
    setIsLoading(false);
    setList(listGroup);
    // }

    //실시간 경로
    const socket = io("localhost:5000/", {
      transports: ["websocket"],
    });
    socket.connect();
    socket.on("connect", () => {
      console.log("socket connected" + socket.id);
    });
    socket.on("Tracking_Result", (data) => {
      console.log(data.Tracking);
      var marker;
      const obj = data.Tracking;
      console.log(obj);

      // listGroup.push(setTable(obj));
      listGroup.map((exobj) => {
        if (exobj.id === obj.id) isDuplicate = true;
      });
      if (isDuplicate) console.log("중복");
      else console.log("중복x");
      if (!isDuplicate) {
        listGroup.push(setTable(obj, detectionOrder));
        setList((prev) => [...prev, setTable(obj), detectionOrder]);
        marker = setMarker(
          map,
          obj,
          data.Tracking.id,
          data.Tracking.url,
          detectionOrder++
        );
        marker.addListener("click", function (e) {
          //obj.id로 api 요청
          setId(e.overlay.idValue);
          setUri(e.overlay.uriValue);
          setModalOpen(true);
          setBlur(true);
        });
        setPolyline(map, lastest.pop(), setPath(obj));
        lastest.push(setPath(obj));
      }
    });
    //http
    // const [start,setStart]=useState();
    // HttpsService.findHumanAction().then((response)=>{
    //   setStart(response.data);
    // })
    new naver.maps.Polyline({
      map: map,
      path: [setPath(response.findHumanAction)],
      endIconSize: 20,
      startIcon: naver.maps.PointingIcon.CIRCLE,
      strokeLineCap: "round",
      strokeWidth: "0.025",
      strokeLineJoin: "round",
      startIconSize: 15,
      strokeWeight: 8,
      strokeColor: "#2840a5",
      strokeOpacity: 0.8,
    });
  }, []);

  console.log({ list });
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
              <ReactTabulator
                columns={columnsforDetaction}
                data={list}
                initialSort={initialSortforDetaction}
              />
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
        <div className={styles.suspectImg}>
          <img src={imgurl} alt={suspectId} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Detection;
