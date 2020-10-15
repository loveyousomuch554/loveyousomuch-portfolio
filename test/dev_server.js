const path = require('path')
const express = require('express')
const MobileDetect = require('mobile-detect')

// Create server
const app = express()
app.use('/', express.static('public'))

// app.get('/mobile', (req, res) => {
//   let p = path.join(__dirname, '..', 'public', 'mobile.html')
//   res.sendFile(p)
// })

app.use('/mobile', (req, res, next) => {
  if(req.query.a == '1') {
    next()
  }
  let p = path.join(__dirname, '..', 'public', 'mobile.html')
  res.sendFile(p)
})

app.get('/mobile-light.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mobile-light.css'))
})

app.get('/mobile-dark.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mobile-dark.css'))
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


// Test command
process.stdin.on('data', (command) => {
  const { spawn } = require('child_process')

  if (command.toString().trim() === 'stop') {
    doSomething(spawn)
  }
})

function doSomething(spawn) {
  const ls = spawn('ls', ['-a'])

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
