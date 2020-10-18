const express = require('express')
const Router = express.Router()
const { routes: project_routes } = require('../reverseproxyconfig.json')
const { createProxyMiddleware } = require('http-proxy-middleware')
// https://loveyousomuch554.dev/projects/

for({route, address} of project_routes) {
  Router.use(route, createProxyMiddleware({ target: address, changeOrigin: true }));
}

exports.Router = Router