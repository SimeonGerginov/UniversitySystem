const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Student = mongoose.model('Student');

let homeworkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  students: [ Student ],
  zip: {
    data: Buffer,
    contentType: String
  }
});

let courseMark = mongoose.model('CourseMark', courseMarkSchema);

module.exports = courseMark;
