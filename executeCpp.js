const fs = require('fs')
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath)
}

const executeCpp = async (filePath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    console.log('jobId', jobId)
    console.log('filePath', filePath)
    console.log('outPath', outPath)
    console.log(__dirname)
    return new Promise(async (resolve, reject) => {
        // Fix the cmd to compile cpp file
        // cd "g:\code editor\code-editor-backend\codes\" ; if ($?) { g++ 1c3c730a-5697-4cb3-a23c-9ce7a5b1ca1b.cpp -o 1c3c730a-5697-4cb3-a23c-9ce7a5b1ca1b } ; if ($?) { .\1c3c730a-5697-4cb3-a23c-9ce7a5b1ca1b }
        // exec(`g++ "${filePath}" -o "${outPath}"`, (error, stdout, stderr) => {
        //     exec(`start ${outPath}`, (error, stdout, stderr) => {
        //         error && reject({ error, stderr });
        //         stderr && reject({ stderr });
        //         resolve(stdout)
        //     })
        // });
        exec(`g++ "${filePath}" -o "${outPath}" && cd "${outputPath}" && ./${jobId}.out`, (error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject({ stderr });
            resolve(stdout)
        })
    })
}

module.exports = {
    executeCpp
}