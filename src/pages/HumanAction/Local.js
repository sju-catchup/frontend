import React from "react";
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./humanAction.module.scss";
import "index.scss";
import Table from "./Table.js";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
// import RecordService from "lib/api/RecordService";
import { io } from "socket.io-client";
// import warn from "assets/warn.png";
const { naver } = window;
import response from "assets/data.json";
const Record = () => {
  const listGroup = [];
  const [list, setList] = useState([]);
  var markerPosition;
  const container = useRef(null);
  useEffect(() => {
    //https 통신
    const options = {
      center: new naver.maps.LatLng(37.54948, 127.07522),
      level: 3,
    };
    const map = new naver.maps.Map(container.current, options);
    response.CCTV.map((obj) => {
      markerPosition = new naver.maps.LatLng(
        parseFloat(obj.position.y),
        parseFloat(obj.position.x)
      );
      new naver.maps.Marker({
        map,
        title: "red",
        position: markerPosition,
        icon: {
          content: [
            '<div className="cs_mapbridge" id="cctv_marker_dot" >',
            "</div>",
          ].join(""),
          size: new naver.maps.Size(10, 10),
          anchor: new naver.maps.Point(19, 58),
        },
        draggable: true,
      });
    });
    // RecordService.viewAllRecord()
    //   .then((response) => {
    response.HumanAction.map(
      (obj) => {
        //table 데이터
        listGroup.push({
          id: obj.id,
          type: obj.type,
          start_time: obj.start_time,
          end_time: obj.end_time,
          url: obj.uri,
          cctv_id: obj.cctv.id,
          position:
            "( " + obj.cctv.position.x + ", " + obj.cctv.position.y + " )",
          address: obj.cctv.address,
          method: "기존기록",
        });
        markerPosition = new naver.maps.LatLng(
          parseFloat(obj.cctv.position.y),
          parseFloat(obj.cctv.position.x)
        );
        new naver.maps.Marker({
          map,
          title: "Green",
          position: markerPosition,
          icon: {
            content: [
              '<div className="cs_mapbridge" id="cctv_marker_number" >',
              obj.id,
              "</div>",
            ].join(""),
            size: new naver.maps.Size(10, 10),
            anchor: new naver.maps.Point(19, 58),
          },
          draggable: true,
        });
        setList(listGroup);
      }
      //map 데이터
    );
    //소켓통신
    const socket = io("https://wild-ways-hope-175-196-45-162.loca.lt", {
      transports: ["websocket"],
    });
    socket.connect();
    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("New_HumanAction", (data) => {
      console.log(data);
      const obj = data.HumanAction;
      //table 데이터
      listGroup.push({
        id: obj.id,
        type: obj.type,
        start_time: obj.start_time,
        end_time: obj.end_time,
        url: obj.uri,
        cctv_id: obj.cctv.id,
        position:
          "( " + obj.cctv.position.x + ", " + obj.cctv.position.y + " )",
        address: obj.cctv.address,
        method: "새",
      }),
        //map 데이터
        (markerPosition = new naver.maps.LatLng(
          parseFloat(obj.cctv.position.y),
          parseFloat(obj.cctv.position.x)
        ));
      new naver.maps.Marker({
        map,
        title: "Green",
        position: markerPosition,
        icon: {
          content: [
            '<div className="cs_mapbridge" id="cctv_marker_number_red" >',
            obj.cctv.id,
            "</div>",
          ].join(""),
          size: new naver.maps.Size(10, 10),
          anchor: new naver.maps.Point(19, 58),
        },
        draggable: true,
      });
      console.log({ listGroup });
      setList(listGroup);
    });
    // socket.on("CCTV", (data) => {
    //   console.log(data);
    // });
    setList(listGroup);
    console.log({ listGroup }, { list });
  }, []);
  return (
    <div id="humanAction">
      <Header />
      <main className="contents">
        <section>
          <header>
            <h1>이상행동 기록 조회</h1>
          </header>
          <div className={styles.container}>
            <div id={"map"} ref={container} className={styles.map}></div>
            <Table list={list} className={styles.table} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Record;
