const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MARKS = [2, 3, 4, 5, 6];

let homeworkMarkSchema = new Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  homeworkId: {
    type: String,
    required: true,
    unique: true
  },
  markValue: {
    type: Number,
    enum: MARKS
  }
});

let homeworkMark = mongoose.model('HomeworkMark', homeworkMarkSchema);

module.exports = homeworkMark;
