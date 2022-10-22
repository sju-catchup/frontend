import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./humanAction.module.scss";
import "index.scss";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
const columns = [
  { title: "id", field: "id" },
  { title: "type", field: "type", align: "left" },
  // formatter: "tickCross",
  { title: "start time", field: "start_time" },
  { title: "end time", field: "end_time", align: "center" },
  { title: "동영상 uri", field: "url", align: "center", formatter: "link" },
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

const Map = (props) => {
  // eslint-disable-next-line react/prop-types
  return <ReactTabulator columns={columns} data={props.list} />;
};

export default Map;
