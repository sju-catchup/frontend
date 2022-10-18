import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./humanAction.module.scss";
import "index.scss";
import Map from "./Map.js";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import RecordService from "lib/api/RecordService";
import { io } from "socket.io-client";
// import response from "assets/data.json";
const Record = () => {
  const listGroup = [];
  const [list, setList] = useState([]);
  useEffect(() => {
    //소켓통신
    const socket = io("https://wild-dodos-eat-175-196-45-162.loca.lt", {
      transports: ["websocket"],
    });
    socket.connect();
    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("New_HumanAction", (data) => {
      console.log(data);
    });
    socket.on("CCTV", (data) => {
      console.log(data);
    });
    RecordService.viewAllRecord()
      .then((response) => {
        console.log(response.data.HumanAction);
        // setData(response.data);
        response.data.HumanAction.map((obj) =>
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
          })
        );

        setList(listGroup);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log({ listGroup }, { list });
  }, []);
  // useEffect(() => {
  //   console.log(response);
  //   response.HumanAction.map((obj) =>
  //     listGroup.push({
  //       id: obj.id,
  //       type: obj.type,
  //       start_time: obj.start_time,
  //       end_time: obj.end_time,
  //       url: obj.uri,
  //       cctv_id: obj.cctv.id,
  //       position:
  //         "( " + obj.cctv.position.x + ", " + obj.cctv.position.y + " )",
  //       address: obj.cctv.address,
  //     })
  //   );

  //   setList(listGroup);
  //   console.log({ listGroup }, { list });
  // }, []);
  return (
    <div id="record">
      <Header />
      <main className="contents">
        <section>
          <header>
            <h1>이상행동 기록 조회</h1>
          </header>
          <Map list={list} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Record;
