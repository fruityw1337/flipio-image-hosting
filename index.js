const express = require('express')
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')

const app = express()
const PORT = 5010

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

app.set('view engine', 'ejs')

app.get("/upload", (req, res) => {
    res.render('uploads')
})

app.post('/api/upload', upload.single('image'), (req, res) => {
    res.send({filename: req.file.filename})
})

app.listen(PORT)
console.log('|LOG| Server is started.')