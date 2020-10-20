const { execFile } = require('child_process')

const firstApp = execFile('./app1.sh')
processHandler(firstApp)

const secondApp = execFile('./app2.sh')
processHandler(secondApp)

function processHandler(child_process) {
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
