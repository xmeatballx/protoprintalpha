const express = require('express');
const multer = require('multer');
const path = require('path');
//const upload = multer({dest: __dirname + '/uploads/images'}, {filename: 'a'});
const app = express();
const PORT = 5000;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, 'a.jpg');
  }
});
var upload = multer({ storage: storage });

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});

app.post('/upload', upload.single('photo'), (req, res) => {
     if(req.file) {
       res.sendFile(__dirname + '/public/uploaded.html');
     }
    // else throw 'error';
});
