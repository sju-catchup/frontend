import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./humanAction.module.scss";
import "index.scss";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { io } from "socket.io-client";
// import response from "assets/data.json";
export const [data, setData] = useState();
const Record = () => {
  useEffect(() => {
    //소켓통신
    const socket = io("https://wild-dodos-eat-175-196-45-162.loca.lt", {
      transports: ["websocket"],
    });
    socket.connect();
    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      setData(socket.id);
    });
    socket.on("New_HumanAction", (data) => {
      console.log(data);
    });
    socket.on("CCTV", (data) => {
      console.log(data);
    });
  }, []);
};

export default Record;
