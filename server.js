const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

const app = express();
const PORT = 5000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// app.post('/upload', upload.single('photo'), (req, res) => {
//     if(req.file) {
//         res.json(req.file);
//     }
//     else throw 'error';
// });

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});