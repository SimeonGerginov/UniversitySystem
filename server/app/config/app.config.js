const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const UPLOAD_URL = '/uploads/';

const configApp = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cors());

    app.set('superSecret', 'Very secret thing');

    const storage = multer.diskStorage({
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}.jpg`)
      },
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `../../uploads`));
      }
    });

    const upload = multer({ storage: storage });

    app.post("/upload", upload.array("uploads[]", 10), function(req, res) {
      const filesUrls = req.files.map(f => UPLOAD_URL + f.filename);
      return res.status(201).send({ success: true, filesUrls });
    })
};

module.exports = configApp;
