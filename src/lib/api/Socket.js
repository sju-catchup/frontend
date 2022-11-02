import { io } from "socket.io-client";
// the following forms are similar
const socket = io("https://bc15-175-196-45-162.jp.ngrok.io");
// const socket = io("wss://server-domain.com");
// const socket = io("server-domain.com");
// only in the browser when the page is served over https (will not work in Node.js)

// server-side
io.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

// client-side
socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

socket.on("connect", () => {
  const engine = socket.io.engine;
  console.log(engine.transport.name); // in most cases, prints "polling"

  engine.once("upgrade", () => {
    // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
    console.log(engine.transport.name); // in most cases, prints "websocket"
  });

  //   engine.on("packet", ({ type, data }) => {
  //     // called for each packet received
  //   });

  //   engine.on("packetCreate", ({ type, data }) => {
  //     // called for each packet sent
  //   });

  engine.on("drain", () => {
    // called when the write buffer is drained
  });

  //   engine.on("close", (reason) => {
  //     // called when the underlying connection is closed
  //   });
});
socket.on("disconnect", () => {
  console.log(socket.connected); // false
});
socket.on("HumanAction", () => {
  console.log(socket.connected); // false
});
