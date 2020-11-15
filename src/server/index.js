const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'conf', '.env')})
const https = require('https')
const express = require('express')
const MobileDetect = require('mobile-detect')

const privateKey = fs.readFileSync('../conf/server.key');
const certificate = fs.readFileSync('../conf/server.crt');
const credentials = { key: privateKey, cert: certificate };

// Create server
const app = express()
const httpsServer = https.createServer(credentials,  app)

app.use('/static', express.static(path.join(__dirname, '..', 'client')))

// Main page
app.get('/', (req, res) => {
  const md = new MobileDetect(req.get('user-agent'))
  const isMobile = md.mobile()

  if (!isMobile) {
    // Send desktop version of the site
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
    return;
  }

  // Send the mobile version of the site
  res.sendFile(path.join(__dirname, '..', 'client', 'mobile.html'))
  return;
})

// Redirect on russian version of resume
app.get('/ru/resume', (req, res) => {
  res.send('<h1>Temporarily unavailable.</h1>')
})

app.get('/en/resume', (req, res) => {
  res.send('<h1>Temporarily unavailable.</h1>')
})

// Processing 404 page
app.use((req, res) => {
  let p = path.join(__dirname, '..', 'client', '404.html')
  res.status(404).sendFile(p)
})

const PORT = process.env.PORT
httpsServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
  console.log(`Start at ${new Date()}`)
})


/* CONSOLE COMMANDS */
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
