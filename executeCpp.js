const fs = require('fs')
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath)
}

const executeCpp = async (filePath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    console.log('jobId', jobId)
    console.log('filePath', filePath)
    console.log('outPath', outPath)
    console.log(__dirname)
    return new Promise(async(resolve, reject) => {
        // Fix the cmd to compile cpp file
        exec(`g++ "${filePath}" -o "${outPath}" && start "${outPath}"`, (error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject({ stderr });
            resolve(stdout);
        });
    })
}

module.exports = {
    executeCpp
}