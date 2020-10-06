const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'))

// Processing 404 page
app.use((req, res, next) => {
  let p = path.join(__dirname, 'public', '404.html')

  res.status(404).sendFile(p)
})

app.listen(8080)