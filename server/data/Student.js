const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const userSchema = require('./User').userSchema();

const Schema = mongoose.Schema;

let studentSchema = userSchema.extend({
    optionalCourses: [ {} ],
    requiredCourses: [ {} ],
    specialty: String,
    marks: [ {} ],
    homeworks: [ {} ],
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
