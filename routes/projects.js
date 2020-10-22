const Router = express.Router()
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const { routes: project_routes } = require('../reverseproxyconfig.json')

/* root - https://loveyousomuch554.dev/projects/ */

// Creates a proxy address for the project
const projectsProxy = (address) => {
  return createProxyMiddleware({
    target: address,
    changeOrigin: true,
    pathRewrite: (path) => {
      return path.split('/').slice(2).join('/')
    }
  })
}

// Add a proxy to each project
for({route, address} of project_routes) { 
  Router.use(route, projectsProxy(address))
}

exports.Router = Router