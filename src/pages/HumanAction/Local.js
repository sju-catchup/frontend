import React from "react";
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./humanAction.module.scss";
import "index.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
// import HttpsService from "lib/api/HttpsService";/
import { io } from "socket.io-client";
const { naver } = window;
import response from "assets/data.json";
const alarmList = [];
function RecordTd({ data }) {
  console.log(data);
  const list = [];
  data.map((obj) => {
    list.push(
      <tr>
        <td>{obj.id}</td>
        <td>{obj.start_time}</td>
        <td>{obj.end_time}</td>
        <td>{obj.uri}</td>
        <td>{obj.cctv.id}</td>
        <td>
          {"( " + obj.cctv.position.x + ", " + obj.cctv.position.y + " )"}
        </td>
        <td>{obj.cctv.address}</td>
      </tr>
    );
  });
  return list;
}
function SocketTd() {
  const list = [];
  console.log(alarmList);
  alarmList.map((obj) => {
    list.push(
      <tr>
        <td>{obj.id}</td>
        <td>{obj.start_time}</td>
        <td>{obj.end_time}</td>
        <td>{obj.uri}</td>
        <td>{obj.cctv.id}</td>
        <td>
          {"( " + obj.cctv.position.x + ", " + obj.cctv.position.y + " )"}
        </td>
        <td>{obj.cctv.address}</td>
      </tr>
    );
  });
  return list;
}
const Record = () => {
  // const listGroup = [];
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  var markerPosition;
  const container = useRef(null);
  useEffect(() => {
    //https 통신
    const options = {
      center: new naver.maps.LatLng(37.54948, 127.07522),
      level: 3,
    };
    const map = new naver.maps.Map(container.current, options);
    // HttpsService.viewAllCCTV().then((response) => {
    // response.data.CCTV.map((obj) => {
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
    //지워야함
    setData(response.HumanAction);
    setloading(false);
    // HttpsService.viewAllRecord().then((response) => {
    // setData(response.data.HumanAction);
    // setloading(false);
    //   console.log(response.data.HumanAction);
    //   response.data.HumanAction.map((obj) => {
    response.HumanAction.map((obj) => {
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
    });
    // }

    //소켓통신
    const socket = io("https://eager-coins-scream-175-196-45-162.loca.lt", {
      transports: ["websocket"],
    });
    socket.connect();
    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("New_HumanAction", (data) => {
      console.log(data);
      alarmList.push(data);
      const obj = data.HumanAction;
      //map 데이터
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
            '<div className="cs_mapbridge" id="cctv_marker_number_red" >',
            obj.cctv.id,
            "</div>",
          ].join(""),
          size: new naver.maps.Size(10, 10),
          anchor: new naver.maps.Point(19, 58),
        },
        draggable: true,
      });
    });
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
            <table>
              {loading ? "" : <RecordTd data={data} />}
              <SocketTd />
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Record;
