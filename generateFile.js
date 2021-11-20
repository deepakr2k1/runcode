const fs = require('fs')
const path = require('path');
const { v4: uuid } = require('uuid')

const dirCodes = path.join(__dirname, "codes");
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes)
}

const generateFile = async (lang, code) => {
    const jobId = uuid();
    const fileName = `${jobId}.${lang}`;
    const filePath = path.join(dirCodes, fileName);
    await fs.writeFileSync(filePath, code);
    return filePath
}

module.exports = {
    generateFile
};