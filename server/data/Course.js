const mongoose = require('mongoose');

const Student = mongoose.model('User');
const Lecturer = mongoose.model('Lecturer');
const Homework = mongoose.model('Homework');
const StudentMark = mongoose.model('StudentMark');
const HomeworkMark = mongoose.model('HomeworkMark');

const Schema = mongoose.Schema;

let courseSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    lecturers: [ Lecturer ],
    schedule: [ String ],
    comments: [ String ],
    students: [ Student ],
    marks: [ StudentMark ] ,
    homeworks: [ Homework ],
    homeworkMarks: [ HomeworkMark ],
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
