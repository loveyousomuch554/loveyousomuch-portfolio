const express = require('express')
const app = express()
const path = require('path')
const MobileDetect = require('mobile-detect')
require('dotenv').config()

app.use((req, res, next) => {
  let md = new MobileDetect(req.get('user-agent'))
  const isMobile = md.mobile()
  
  if(!isMobile) {
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

const PORT = process.env.NODE_ENV === "production" ?
  process.env.PORT :
  8080;

app.listen(PORT)