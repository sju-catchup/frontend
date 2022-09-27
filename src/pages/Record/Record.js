import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./record.module.scss";
import "../../index.scss";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
// import RecordService from "../../lib/api/RecordService";
const columns = [
  { title: "id", field: "id" },
  { title: "type", field: "type", align: "left" },
  // formatter: "tickCross",
  { title: "start_time", field: "start_time" },
  { title: "end_time", field: "end_time", align: "center" },
  { title: "동영상 url", field: "url", align: "center", formatter: "link" },
  {
    title: "cctv",
    field: "passed",
    align: "center",
  },
];
const data = [
  {
    id: 1,
    type: "none",
    start_time: "2022/09/27 13:30",
    end_time: "2022/09/27 13:34",
    url: "https://www.youtube.com/watch?v=VP5qPgZHqAs",
    cctv: "",
  },
  {
    id: 2,
    type: "abnormal",
    start_time: "2022/09/27 13:30",
    end_time: "2022/09/27 13:34",
    url: "https://www.youtube.com/watch?v=VP5qPgZHqAs",
    cctv: "",
  },
];

const Record = () => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   RecordService.viewAllRecord().then((response) => {
  //     console.log(response);
  //     setData(response.data.data);
  //   });
  // }, []);
  return (
    <div id="record">
      <Header />
      <Sidebar />
      <main className="contents">
        <section>
          <ReactTabulator columns={columns} data={data} />
        </section>
      </main>
    </div>
  );
};

export default Record;
