const path = require('path')
const express = require('express')
const { Router: projectsRouter } = require('../routes/projects')

// Create server
const app = express()
app.use('/static', express.static('public'))

app.use('/projects', projectsRouter)

app.get('/mobile', (req, res, next) => {
  let p = path.join(__dirname, '..', 'public', 'mobile.html')
  res.sendFile(p)
})

// Processing 404 page
app.use((req, res, next) => {
  let p = path.join(__dirname, '..', 'public', '404.html')
  res.status(404).sendFile(p)
})

const PORT = 80;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
  console.log(`Start at ${new Date()}`)
})
