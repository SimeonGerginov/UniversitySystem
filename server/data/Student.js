const mongoose = require('mongoose');
const mongooseExtend = require('mongoose-schema-extend');
const userSchema = require('./User').userSchema;

const Course = mongoose.model('Course');
const CourseMark = mongoose.model('CourseMark');
const Homework = mongoose.model('Homework');
const HomeworkMark = mongoose.model('HomeworkMark');

const Schema = mongoose.Schema;

let studentSchema = userSchema.mongooseExtend({
    optionalCourses: [Course],
    requiredCourses: [Course],
    marks: CourseMark,
    homeworks: [Homework],
    homeworksMarks: [homeworkMarks],
    currentCreditsCount: {
        type: Number,
        default: 0
    },
    creditsToAchieve: {
        type: Number,
        default: 240
    },
    currentCourseInUniversity: {
        type: Number,
        enum: [1, 2, 3, 4],
        default: 1
    }
});

let Student = mongoose.model('Student', studentSchema);

module.exports = Student;
