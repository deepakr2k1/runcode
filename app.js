const express = require('express');
const morgan = require('morgan')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'));

// --------------------------------

const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');

app.post("/run", async (req, res) => {
    try {
        var {lang, code} = req.body;
        if(!lang || !code) {
            return res.status(400).json({success: false, error: "Code or language cannot be empty"});
        }
        var filePath = await generateFile(lang, code);
        var output = await executeCpp(filePath);
        return res.json({ output });
    } catch(e) {
        console.log(e);
    }
})
// --------------------------------
app.get("/", async (req, res) => {
    res.status(200).json('Server is working');
})
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
});