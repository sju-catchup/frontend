const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://bc15-175-196-45-162.jp.ngrok.io",
      changeOrigin: true,
    })
  );
};
//백엔드 서버로 api 요청을 위해 proxy 설정
//npx json-server ./data.json --port 4000

// module.exports = function (app) {
//   app.use(
//     "/",
//     createProxyMiddleware({
//       target: "https://6486-115-91-214-2.jp.ngrok.io",
//       changeOrigin: true,
//     })
//   );
// };
