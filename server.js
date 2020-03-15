const express = require('express');
const multer = require('multer');
const path = require('path');
//const upload = multer({dest: __dirname + '/uploads/images'}, {filename: 'a'});
const app = express();
const PORT = process.env.PORT || 5000;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, 'a.jpg');
  }
});
var upload = multer({ storage: storage });

app.use(express.static('public'));

app.get('/mobile', upload.single('photo'), (req, res) => {
       res.sendFile(__dirname + '/public/mobilehome.html');
    // else throw 'error';
});

app.post('/mobileupload', upload.single('photo'), (req, res) => {
     if(req.file) {
       res.sendFile(__dirname + '/public/mobileuploaded.html');
     }
    // else throw 'error';
});

app.post('/upload', upload.single('photo'), (req, res) => {
     if(req.file) {
       res.sendFile(__dirname + '/public/uploaded.html');
     }
    // else throw 'error';
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
