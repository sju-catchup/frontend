import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./record.scss";
import "../../index.scss";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
// import RecordService from "../../lib/api/RecordService";
const columns = [
  { title: "id", field: "id" },
  { title: "type", field: "type", align: "left" },
  // formatter: "tickCross",
  { title: "start time", field: "start_time" },
  { title: "end time", field: "end_time", align: "center" },
  { title: "동영상 url", field: "url", align: "center", formatter: "link" },
  {
    title: "cctv id",
    field: "id",
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
const data = [
  {
    id: 1,
    type: "none",
    start_time: "2022/09/27 13:30",
    end_time: "2022/09/27 13:34",
    url: "https://www.youtube.com/watch?v=VP5qPgZHqAs",
    cctv: "서",
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
          <header>
            <h1>이상행동 기록 조회</h1>
          </header>
          <ReactTabulator columns={columns} data={data} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Record;
