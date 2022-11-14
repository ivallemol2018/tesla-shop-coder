const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/*", { target: "http://127.0.0.1:8080/", secure:false, headers: { "Connection": "keep-alive"} })
  );
  app.use(
    createProxyMiddleware("/api/user/*", { target: "http://127.0.0.1:8080/", secure:false, headers: { "Connection": "keep-alive"} })
  );
  app.use(
    createProxyMiddleware("/api/messages/*", { target: "http://127.0.0.1:8080/", secure:false, headers: { "Connection": "keep-alive"} })
  );
  app.use(
    createProxyMiddleware("/api/admin/*", { target: "http://127.0.0.1:8080/", secure:false, headers: { "Connection": "keep-alive"} })
  );
  app.use(
    createProxyMiddleware("/api/products/*", { target: "http://127.0.0.1:8080/",secure:false, headers: { "Connection": "keep-alive"} })
  );
  app.use(
    createProxyMiddleware("/api/orders/*", { target: "http://127.0.0.1:8080/",secure:false, headers: { "Connection": "keep-alive"} })
  );
  app.use(
    createProxyMiddleware("/api/carrito/*", { target: "http://127.0.0.1:8080/",secure:false, headers: { "Connection": "keep-alive"} })
  );   
  app.use(
    createProxyMiddleware("/api/carrito/*/products", { target: "http://127.0.0.1:8080/",secure:false, headers: { "Connection": "keep-alive"} })
  );  
  app.use(
    createProxyMiddleware("/api/carrito/*/products/*", { target: "http://127.0.0.1:8080/",secure:false, headers: { "Connection": "keep-alive"} })
  );
  
};