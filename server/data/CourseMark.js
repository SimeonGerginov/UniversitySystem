const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MARKS = [2, 3, 4, 5, 6];

let courseMarkSchema = new Schema({
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  markValue: {
    type: Number,
    enum: MARKS
  }
});

let courseMark = mongoose.model('CourseMark', courseMarkSchema);

module.exports = courseMark;
