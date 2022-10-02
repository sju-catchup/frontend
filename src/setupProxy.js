const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
//백엔드 서버로 api 요청을 위해 proxy 설정
//npx json-server ./data.json --port 4000
