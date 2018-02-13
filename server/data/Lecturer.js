const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const userSchema = require('./User').userSchema();

const Schema = mongoose.Schema;

let lecturerSchema = userSchema.extend({
    optionalCourses: [ {} ],
    requiredCourses: [ {} ]
});

let Lecturer = mongoose.model('Lecturer', lecturerSchema);

module.exports = Lecturer;
