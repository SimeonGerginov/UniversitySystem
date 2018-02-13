const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let homeworkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  students: [ {} ],
  fileUrl: String
});

let Homework = mongoose.model('Homework', homeworkSchema);

module.exports = Homework;
