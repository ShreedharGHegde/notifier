const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

const PORT = 5000;

//'uploads' is image storage destination
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});


//argument in upload.single() function should match with HTML input field's 'name' attribute. Form data can be accessed in req.body, files can be accessed in req.file
app.post("/notify", upload.single("image"), function(req, res, next) {
  if(req.body && req.file) {
      res.send('Uplaoded successfully')
  }
});

app.listen(PORT, () => {
  console.log(`Server stared on ${PORT}`);
});
