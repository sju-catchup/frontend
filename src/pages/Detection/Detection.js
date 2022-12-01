import React, { useEffect, useRef, useState } from "react";
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
import {
  columnsforDetaction,
  initialSortforDetaction,
} from "assets/TableColumn.js";
// import { getElem, makeMarker, pushToList } from "lib/utils/forHumanaction";
import { setTable, makeMarker } from "lib/utils/forDetection";
// import HttpsService from "lib/api/HttpsService";

const { naver } = window;
const Detection = () => {
  const container = useRef(null);
  const [prevSortPosition, setPrevSortPosition] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [blur, setBlur] = useState(false);
  const [id, setId] = useState();
  const [uri, setUri] = useState();
  const [socketData, setSocketData] = useState("");
  const [list, setList] = useState([]);
  const [trackingPath, setTrackingPath] = useState([]);
  var map;
  const imgurl = useLocation().state.suspectImgUrl;
  const suspectData = useLocation().state.suspectData;
  const closeModal = () => {
    setModalOpen(false);
    setBlur(false);
  };

  const socket = io("http://15.164.233.153:3000", {
    transports: ["websocket"],
  });
  useEffect(() => {
    map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.560518, 127.085579),
      zoom: 16,
      minZoom: 7,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
      },
    });
    //이상행동 발생위치 추가
    // setPrevSortPosition([
    //   {
    //     id: suspectData.id,
    //     url: suspectData.url,
    //     cctv_id: suspectData.cctv_id,
    //     lat: suspectData.lat,
    //     lng: suspectData.lng,
    //     address: suspectData.address,
    //     order: 0,
    //     start_time: "0",
    //     position: new naver.maps.LatLng(suspectData.lat, suspectData.lng),
    //   },
    // ]);

    // const socket = io("localhost:5000", {
    //   transports: ["websocket"],
    // });
    socket.connect();
    socket.on("connect", () => {
      console.log("socket connected" + socket.id);
    });
    socket.on("Tracking_Result", (data) => {
      const obj = data.Tracking;
      setSocketData(setTable(obj));
      setPrevSortPosition((prev) => [...prev, setTable(obj)]);
    });
  }, []);
  useEffect(() => {
    map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.560518, 127.085579),
      zoom: 16,
      minZoom: 7,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
      },
    });
    new naver.maps.Polyline({
      map: map,
      path: trackingPath,
      endIconSize: 20,
      startIcon: naver.maps.PointingIcon.CIRCLE,
      strokeLineCap: "round",
      strokeWidth: "0.025",
      strokeLineJoin: "round",
      startIconSize: 15,
      strokeWeight: 8,
      strokeColor: "#2840a5",
      // strokeColor: "#ff8700",
      strokeOpacity: 0.9,
    });
    // makeMarker(map, list, 0, setId, setUri, setModalOpen, setBlur);
  }, [trackingPath]);
  useEffect(() => {
    //테이블과 마커에서 사용할 'list' 가공
    console.log({ list });
    const idx = list.findIndex((i) => i.id === socketData.id);
    if (idx === -1) {
      console.log({ socketData });
      setTrackingPath([
        new naver.maps.LatLng(suspectData.lat, suspectData.lng),
      ]); //tpath 초기화
      const newArray = prevSortPosition.reduce(function (acc, current) {
        if (acc.findIndex(({ id }) => id === current.id) === -1) {
          acc.push(current);
        }
        return acc;
      }, []);

      var postSort = newArray.sort(function (a, b) {
        //시간 순 정렬
        let x = parseInt(a.time);
        let y = parseInt(b.time);
        if (x < y) return -1;
        else if (x > y) return 1;
        return 0;
      });
      for (let i = 0; i < postSort.length; i++) {
        setTrackingPath((prev) => [...prev, postSort[i].position]);
        postSort[i].order = i + 1;
      }
      console.log({ postSort });
      setList(postSort); //정렬된 값을 list에 넣음
    } else {
      console.log("중복");
      console.log("same" + socketData.id);
    }
  }, [socketData]);
  useEffect(() => {});
  useEffect(() => {
    console.log({ list });
    makeMarker(map, list, setId, setUri, setModalOpen, setBlur); //마커 만들기
  }, [list]); //중복 아닌 데이터 왔을 때만 실행
  console.log({ list });
  return (
    <div id="record">
      <Header />
      <main className="contents">
        <section className={blur ? styles.blur : ""}>
          <header>
            <h1>객체추적</h1>
          </header>
          <div className={styles.container}>
            <div id={"map"} ref={container} className={styles.map}></div>
            <ReactTabulator
              columns={columnsforDetaction}
              data={list}
              initialSort={initialSortforDetaction}
            />
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
          <img src={imgurl} alt="suspect" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Detection;
