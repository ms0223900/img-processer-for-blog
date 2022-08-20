const {
  exec,
} = require('child_process');

const printExecLog = (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log('Out dir cleared.')
  // console.log(`stdout: ${stdout}`);
  // console.error(`stderr: ${stderr}`);
}

const clearOutDir = () => {
  if (process.platform.match(/win/g)) {
    exec('powershell rm -r out & powershell mkdir out', printExecLog)
    return
  }

  exec('rm -rf out & mkdir out', printExecLog)
}

clearOutDir()

module.exports = clearOutDir