const path = require('path')
const express = require('express')
const MobileDetect = require('mobile-detect')

// Create server
const app = express()

app.use((req, res, next) => {
  let md = new MobileDetect(req.get('user-agent'))
  const isMobile = md.mobile()

  if(!isMobile) {
    next()
    return
  }

  let p = path.join(__dirname, '..', 'public', 'mobile.html')
  res.sendFile(p)
  return;
})

app.use(express.static('public'))

// Processing 404 page
app.use((req, res, next) => {
  let p = path.join(__dirname, '..', 'public', '404.html')

  res.status(404).sendFile(p)
})

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}\nNODE_ENV = ${process.env.NODE_ENV}`)
  console.log(`Start at ${new Date()}`)
})
