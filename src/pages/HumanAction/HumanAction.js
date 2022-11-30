import React from "react";
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator_semanticui.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { io } from "socket.io-client";

import "index.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Modal from "components/Modal/SuspectSelectionModal";
import styles from "./humanAction.module.scss";
import { getElem, makeMarker } from "lib/utils/forHumanaction";
import { columns, initialSort } from "assets/TableColumn.js";
import HttpsService from "lib/api/HttpsService";
// import response from "assets/data.json";

const { naver } = window;
var map;
const Record = () => {
  const [list, setList] = useState([]);
  const [socketData, setSocketData] = useState("");
  const [loading, setloading] = useState(true);
  const container = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [blur, setBlur] = useState(false);
  const [detectData, setDetectData] = useState({
    cctv_id: "",
    url: "",
    start: "",
    end: "",
    lat: "",
    lng: "",
  });
  const closeModal = () => {
    setModalOpen(false);
    setBlur(false);
  };
  const socket = io("http://15.164.233.153:3000", {
    transports: ["websocket"],
  });
  useEffect(() => {
    map = new naver.maps.Map(container.current, {
      center: new naver.maps.LatLng(37.560518, 127.085579),
      level: 3,
      zoom: 16,
      minZoom: 7, //지도의 최소 줌 레벨
      zoomControl: true, //줌 컨트롤의 표시 여부
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
      },
    });
    //https 통신
    HttpsService.viewAllCCTV().then((response) => {
      // console.log(response.data);
      // response.data.CCTV.map((obj) => {
      makeMarker(
        map,
        response.data.CCTV,
        detectData,
        setDetectData,
        setModalOpen,
        setBlur,
        "_dot"
      );
      // });
    });
    HttpsService.viewAllRecord()
      .then((response) => {
        // console.log(response.data.HumanAction);
        response.data.HumanAction.map((obj) => {
          setList((prev) => [...prev, getElem(obj, "api")]);
          //   setSocketData(getElem(obj));
          console.log(list);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setloading(false);

    // const socket = io("localhost:5000", {
    //   transports: ["websocket"],
    // });
    //소켓통신
    socket.connect();
    // client-side
    socket.on("connect", () => {
      console.log("socket connected" + socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
    socket.on("New_HumanAction", (data) => {
      setSocketData(getElem(data.HumanAction, "socket"));
    });
    setloading(false);
  }, []);
  useEffect(() => {
    console.log({ list });
    const idx = list.findIndex((i) => i.id == socketData.id);
    if (idx === -1) setList((prev) => [...prev, socketData]);
    else {
      console.log("중복된 데이터");
    }
  }, [socketData]);
  useEffect(() => {
    makeMarker(
      map,
      list,
      detectData,
      setDetectData,
      setModalOpen,
      setBlur,
      "_number"
    );
    console.log(detectData);
  }, [list]);
  console.log(detectData);
  return (
    <div id="record">
      <Header />
      <main className="contents">
        <section className={blur ? styles.blur : ""}>
          <header>
            <h1>이상행동 기록 조회</h1>
          </header>
          <div className={styles.container}>
            <div id={"map"} ref={container} className={styles.map}></div>
            {loading ? (
              ""
            ) : (
              <ReactTabulator
                columns={columns}
                initialSort={initialSort}
                data={list}
              />
            )}
          </div>
        </section>
        <Modal
          open={modalOpen}
          close={closeModal}
          setPrevModalOpen={setModalOpen}
          header="추적대상 선정"
          suspectData={detectData}
          setBlur={setBlur}
        ></Modal>
      </main>
      <Footer />
    </div>
  );
};

export default Record;
