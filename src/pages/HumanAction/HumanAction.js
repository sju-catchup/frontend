import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./humanAction.module.scss";
import "index.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import RecordService from "lib/api/RecordService";
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
  useEffect(() => {
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
            cctv_id: obj.cctv_id,
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
  return (
    <div id="record">
      <Header />
      <main className="contents">
        <section>
          <header>
            <h1>이상행동 기록 조회</h1>
          </header>
          <ReactTabulator columns={columns} data={list} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Record;
