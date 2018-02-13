const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let courseSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    lecturers: [ {} ],
    comments: [ String ],
    students: [ {} ],
    marks: [ {} ],
    homeworks: [ {} ],
    isRequired: {
      type: Boolean,
      required: true,
      default: true
    },
    credits: {
      type: Number,
      required: true,
      default: 5
    },
    maxPlacesInCourse: {
      type: Number,
      required: true,
      default: 100
    },
    availablePlacesInCourse: {
      type: Number,
      default: 100
    }
});

let Course = mongoose.model('Course', courseSchema);

module.exports = Course;
