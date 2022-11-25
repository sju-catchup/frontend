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
import { getElem, setMarker, pushToList } from "lib/utils/forHumanaction";
import { columns, initialSort } from "assets/TableColumn.js";
// import HttpsService from "lib/api/HttpsService";
import response from "assets/data.json";

const { naver } = window;
const Record = () => {
  const listGroup = [];
  const socketData = [];
  const socketList = [];
  const [list, setList] = useState([]);
  const [loading, setloading] = useState(true);
  const container = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [blur, setBlur] = useState(false);
  const [detectData, setDetectData] = useState({
    cctv_id: "",
    url: "",
    start: "",
    end: "",
  });
  const closeModal = () => {
    setModalOpen(false);
    setBlur(false);
  };
  useEffect(() => {
    const map = new naver.maps.Map(container.current, {
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
    // HttpsService.viewAllCCTV().then((response) => {
    //   // console.log(response.data);
    //   response.data.CCTV.map((obj) => {
    response.CCTV.map((obj) => {
      setMarker(
        map,
        obj,
        detectData,
        setDetectData,
        setModalOpen,
        setBlur,
        "_dot",
        ""
      );
    });
    // });
    // HttpsService.viewAllRecord()
    //   .then((response) => {
    //     // console.log(response.data.HumanAction);
    //     response.data.HumanAction.map((obj) => {
    response.HumanAction.map((obj) => {
      //table 데이터
      listGroup.push(getElem(obj)),
        //map 데이터
        setMarker(
          map,
          obj,
          detectData,
          setDetectData,
          setModalOpen,
          setBlur,
          "_number",
          ""
        );
    });
    setList(listGroup);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    setloading(false);

    const socket = io("https://fae2-175-196-45-162.jp.ngrok.io", {
      transports: ["websocket"],
    });
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
      const obj = data.HumanAction;
      const elem = getElem(obj);
      if (socketList.length === 0) {
        pushToList(socketData, socketList, obj, elem, setList);
        setMarker(
          map,
          obj,
          detectData,
          setDetectData,
          setModalOpen,
          setBlur,
          "_number",
          "_red"
        );
        socketData.map((obj) => {
          setList((prev) => [...prev, obj]);
        });
      }
      socketList.map((existingObj) => {
        if (existingObj.id !== obj.id) {
          //table 데이터
          socketData.pop();
          pushToList(socketData, socketList, obj, elem, setList);
          setMarker(
            map,
            obj,
            detectData,
            setDetectData,
            setModalOpen,
            setBlur,
            "_number",
            "_red"
          );
          socketData.map((obj) => {
            setList((prev) => [...prev, obj]);
          });
        }
      });
    });
    setloading(false);
  }, []);
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
          id={detectData.cctv_id}
          uri={detectData.url}
          start={detectData.start}
          end={detectData.end}
          header="추적대상 선정"
          setBlur={setBlur}
        ></Modal>
      </main>
      <Footer />
    </div>
  );
};

export default Record;
