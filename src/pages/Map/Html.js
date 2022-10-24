import React from "react";
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "pages/HumanAction/humanAction.module.scss";
import "index.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
// import HttpsService from "lib/api/HttpsService";
import { io } from "socket.io-client";
import response from "assets/data.json";
// import respons from "assets/dat.json";
const { naver } = window;
const columns = [
  { title: "id", field: "id" },
  { title: "type", field: "type", align: "left" },
  // formatter: "tickCross",
  { title: "start time", field: "start_time" },
  { title: "end time", field: "end_time", align: "center" },
  { title: "동영상 url", field: "url", align: "center", formatter: "link" },
  {
    title: "cctv id",
    field: "cctv_id",
    align: "center",
  },

  {
    title: "cctv 좌표",
    field: "position",
    align: "center",
  },
  {
    title: "cctv 위치",
    field: "address",
    align: "center",
  },
];
const Record = () => {
  const listGroup = [];
  const [list, setList] = useState([]);
  var markerPosition;
  const container = useRef(null);
  const options = {
    center: new naver.maps.LatLng(37.54948, 127.07522),
    level: 3,
  };

  useEffect(() => {
    const map = new naver.maps.Map(container.current, options);
    //https 통신
    // HttpsService.viewAllRecord().then((response) => {
    //   console.log(response.data.HumanAction);
    response.HumanAction.map((obj) => {
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
    setList(listGroup);
    //.catch((error) => {
    //console.log(error);
    //});

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
            obj.id,
            "</div>",
          ].join(""),
          size: new naver.maps.Size(10, 10),
          anchor: new naver.maps.Point(19, 58),
        },
        draggable: true,
      });
      setList(listGroup);
      // });
      console.log({ listGroup }, { list });
    });
    setList(listGroup);
  }, []);
  return (
    <div id="record">
      <Header />
      <main className="contents">
        <section>
          <header>
            <h1>이상행동 기록 조회</h1>
          </header>
          <div className={styles.container}>
            <div id={"map"} ref={container} className={styles.map}></div>

            <ReactTabulator columns={columns} data={list} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Record;
