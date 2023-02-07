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
