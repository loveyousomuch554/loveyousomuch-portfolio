const fs = require('fs')
require('dotenv').config()
const path = require('path')
const https = require('https')
const express = require('express')
const MobileDetect = require('mobile-detect')

const privateKey = fs.readFileSync('../conf/server.key');
const certificate = fs.readFileSync('../conf/server.crt');
const credentials = {key: privateKey, cert: certificate};

// Create server
const app = express()
const httpsServer = https.createServer(credentials,  app)

app.use((req, res, next) => {
  let md = new MobileDetect(req.get('user-agent'))
  const isMobile = md.mobile()

  if (!isMobile) {
    next()
    return
  }

  let p = path.join(__dirname, 'public', 'mobile.html')
  res.sendFile(p)
  return;
})

app.use(express.static('public'))

// Processing 404 page
app.use((req, res, next) => {
  let p = path.join(__dirname, 'public', '404.html')

  res.status(404).sendFile(p)
})

const PORT = process.env.PORT

httpsServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
  console.log(`Start at ${new Date()}`)
})
