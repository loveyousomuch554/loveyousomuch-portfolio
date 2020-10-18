const express = require('express')
const Router = express.Router()

Router.get('/projects', (req, res) => {
  res.send('Hello World!')
})

exports.Router = Router