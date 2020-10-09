const express = require('express')
const app = express()
const path = require('path')
const MobileDetect = require('mobile-detect')

// app.use((req, res, next) => {
//   let md = new MobileDetect(req.get('user-agent'))

//   console.log( md.mobile() );
//   console.log( md.userAgent() )
//   next()
// })

app.use(express.static('public'))

// Mobile version of website
app.get('/mobile', (req, res) => {
  let p = path.join(__dirname, 'public', 'mobile.html')

  res.sendFile(p)
})

// Processing 404 page
app.use((req, res, next) => {
  let p = path.join(__dirname, 'public', '404.html')

  res.status(404).sendFile(p)
})

app.listen(8080)