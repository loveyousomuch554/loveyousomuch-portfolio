const express = require('express')
const Router = express.Router()
const { routes: project_routes } = require('../reverseproxyconfig.json')
const { createProxyMiddleware } = require('http-proxy-middleware')
// https://loveyousomuch554.dev/projects/

const projectsProxy = (address) => {
  return createProxyMiddleware({
    target: address,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      return path.split('/').slice(2).join('/')
    }
  })
}

for({route, address} of project_routes) { 
  Router.use(route, projectsProxy(address))
}

exports.Router = Router