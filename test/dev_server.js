const path = require('path')
const express = require('express')
require('dotenv').config({ path: 
  path.join(__dirname, '..', 'src', 'server', 'conf', '.env')
})

// Create server
const app = express()
app.use('/static', express.static(path.join(__dirname, '..', 'src', 'client')))

app.get('/mobile', (req, res) => {
  let p = path.join(__dirname, '..', 'public', 'mobile.html')
  res.sendFile(p)
})

app.get('/ru/resume', (req, res) => {
  res.redirect('/static/pictures/loveyousomuch554.pdf')
})

// Processing 404 page
app.use((req, res, next) => {
  let p = path.join(__dirname, '..', 'src', 'client', '404.html')
  res.status(404).sendFile(p)
})

const PORT = process.env.DEV_PORT
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
  console.log(`Start at ${new Date()}`)
})
