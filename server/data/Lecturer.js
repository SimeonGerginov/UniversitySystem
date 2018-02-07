const mongoose = require('mongoose');
const mongooseExtend = require('mongoose-schema-extend');
const userSchema = require('./User').userSchema;

const Course = mongoose.model('Course');

const Schema = mongoose.Schema;

let lecturerSchema = userSchema.mongooseExtend({
    optionalCourses: [Course],
    requiredCourses: [Course]
});

let Lecturer = mongoose.model('Lecturer', lecturerSchema);

module.exports = Lecturer;
