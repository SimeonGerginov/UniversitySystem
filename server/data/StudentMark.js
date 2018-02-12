const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MARKS = [2, 3, 4, 5, 6];

let studentMarkSchema = new Schema({
  studentName: {
    type: String,
    required: true,
    unique: true
  },
  markValue: {
    type: Number,
    enum: MARKS
  }
});

let studentMark = mongoose.model('StudentMark', studentMarkSchema);

module.exports = studentMark;
