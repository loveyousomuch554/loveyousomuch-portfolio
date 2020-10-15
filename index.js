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

app.use('/', (req, res, next) => {
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

app.get('/mobile-light.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mobile-light.css'))
})

app.get('/mobile-dark.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mobile-dark.css'))
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


const { spawn } = require('child_process')

// Listening to commands while the server is running
process.stdin.on('data', (raw_command) => {
  const command = raw_command.toString().trim()

  if (command === 'stop') {
    stopServer()
  } else if (command === 'restart') {
    restartServer()
  }
})

function stopServer() {
  const stop = spawn('sudo', ['bash', 'server.sh', 'stop'])
  spawnHandler(stop)
}

function restartServer() {
  const restart = spawn('sudo', ['bash', 'server.sh', 'restart'])
  spawnHandler(restart)
}

function spawnHandler(child_process) {
  child_process.stdout.on('data', (data) => {
    console.log(data.toString())
  });

  child_process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child_process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
