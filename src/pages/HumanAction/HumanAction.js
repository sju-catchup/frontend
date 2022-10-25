import React from "react";
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "index.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import styles from "./humanAction.module.scss";
import * as HttpsService from "lib/api/HttpsService";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator_simple.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { io } from "socket.io-client";
// import response from "assets/data.json";
const { naver } = window;
const columns = [
  { title: "id", field: "id" },

  { title: "type", field: "type", align: "left" },
  // formatter: "tickCross",
  {
    title: "생성시간",
    field: "createdAt",
    align: "center",
    width: 10,
  },
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
  {
    title: "cctv 위치",
    field: "address",
    align: "center",
  },
];
const initialSort = [
  { column: "createdAt", dir: "desc" }, //sort by this first
];
const Record = () => {
  const listGroup = [];
  const socketData = [];
  const socketList = [];
  const [list, setList] = useState([]);
  const [loading, setloading] = useState(true);
  var markerPosition;
  const container = useRef(null);
  const options = {
    center: new naver.maps.LatLng(37.54948, 127.07522),
    level: 3,
  };

  const socket = io("https://sharp-vans-pull-175-196-45-162.loca.lt", {
    transports: ["websocket"],
  });

  useEffect(() => {
    const map = new naver.maps.Map(container.current, options);
    //https 통신
    HttpsService.viewAllRecord()
      .then((response) => {
        // console.log(response.data.HumanAction);
        response.data.HumanAction.map((obj) => {
          //table 데이터
          listGroup.push({
            id: obj.id,
            type: obj.type,
            createdAt: obj.createdAt,
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
                "<div>",
                obj.id,
                "</div>",
                "</div>",
              ].join(""),
              size: new naver.maps.Size(10, 10),
              anchor: new naver.maps.Point(19, 58),
            },
            draggable: true,
          });
        });
        setList(listGroup);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log({ listGroup }, { list });
    setloading(false);
    //소켓통신
    socket.connect();
    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("New_HumanAction", (data) => {
      console.log({ list });
      const obj = data.HumanAction;
      if (socketList.length === 0) {
        socketList.push({
          id: obj.id,
          type: obj.type,
          createdAt: obj.createdAt,
          start_time: obj.start_time,
          end_time: obj.end_time,
          url: obj.uri,
          cctv_id: obj.cctv.id,
          position:
            "( " + obj.cctv.position.x + ", " + obj.cctv.position.y + " )",
          address: obj.cctv.address,
        });
        socketData.push({
          id: obj.id,
          type: obj.type,
          createdAt: obj.createdAt,
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
              "<div>",
              obj.id,
              "</div>",
              "</div>",
            ].join(""),
            size: new naver.maps.Size(10, 10),
            anchor: new naver.maps.Point(19, 58),
          },
          draggable: true,
        });
        // console.log(socketData);
        socketData.map((obj) => {
          setList((prev) => [...prev, obj]);
        });
      }
      socketList.map((objList) => {
        console.log(objList);
        if (objList.id !== obj.id) {
          //table 데이터
          console.log(obj);
          socketData.pop();
          socketList.push({
            id: obj.id,
            type: obj.type,
            createdAt: obj.createdAt,
            start_time: obj.start_time,
            end_time: obj.end_time,
            url: obj.uri,
            cctv_id: obj.cctv.id,
            position:
              "( " + obj.cctv.position.x + ", " + obj.cctv.position.y + " )",
            address: obj.cctv.address,
          });
          socketData.push({
            id: obj.id,
            type: obj.type,
            createdAt: obj.createdAt,
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
                "<div>",
                obj.id,
                "</div>",
                "</div>",
              ].join(""),
              size: new naver.maps.Size(10, 10),
              anchor: new naver.maps.Point(19, 58),
            },
            draggable: true,
          });
          // console.log(socketData);
          socketData.map((obj) => {
            setList((prev) => [...prev, obj]);
          });
        }
      });
    });
    console.log({ listGroup }, { list });
    setloading(false);
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
      </main>
      <Footer />
    </div>
  );
};

export default Record;
