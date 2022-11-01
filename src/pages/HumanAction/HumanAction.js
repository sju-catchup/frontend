import React from "react";
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "index.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import styles from "./humanAction.module.scss";
import HttpsService from "lib/api/HttpsService";
import { columns, initialSort } from "assets/TableColumn.js";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator_simple.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { io } from "socket.io-client";
// import response from "assets/data.json";
const { naver } = window;
const Record = () => {
  const listGroup = [];
  const socketData = [];
  const socketList = [];
  const [list, setList] = useState([]);
  const [loading, setloading] = useState(true);
  var markerPosition;
  const container = useRef(null);

  const socket = io("https://sweet-plants-lead-175-196-45-162.loca.lt/", {
    transports: ["websocket"],
  });
  useEffect(() => {
    const Map = new naver.maps.Map(container.current, {
      center: new naver.maps.LatLng(37.5505118, 127.0666035),
      level: 3,
      zoom: 18,
      minZoom: 7, //지도의 최소 줌 레벨
      zoomControl: true, //줌 컨트롤의 표시 여부
      zoomControlOptions: {
        //줌 컨트롤의 옵션
        position: naver.maps.Position.TOP_LEFT,
      },
    });
    //https 통신
    HttpsService.viewAllCCTV().then((response) => {
      console.log(response.data);
      response.data.CCTV.map((obj) => {
        markerPosition = new naver.maps.LatLng(
          parseFloat(obj.position.x),
          parseFloat(obj.position.y)
        );
        new naver.maps.Marker({
          Map,
          title: obj.address,
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
    });
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
              parseFloat(obj.cctv.position.x),
              parseFloat(obj.cctv.position.y)
            ));
          new naver.maps.Marker({
            Map,
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
    setloading(false);

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
      const elem = {
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
      };
      if (socketList.length === 0) {
        socketList.push(elem);
        socketData.push(elem),
          //map 데이터
          (markerPosition = new naver.maps.LatLng(
            parseFloat(obj.cctv.position.x),
            parseFloat(obj.cctv.position.y)
          ));
        new naver.maps.Marker({
          Map,
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
        socketData.map((obj) => {
          setList((prev) => [...prev, obj]);
        });
      }
      socketList.map((existingObj) => {
        console.log(existingObj);
        if (existingObj.id !== obj.id) {
          //table 데이터
          console.log(obj);
          socketData.pop();
          socketList.push(elem);
          socketData.push(elem),
            //map 데이터
            (markerPosition = new naver.maps.LatLng(
              parseFloat(obj.cctv.position.x),
              parseFloat(obj.cctv.position.y)
            ));
          new naver.maps.Marker({
            Map,
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
