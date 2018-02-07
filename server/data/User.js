const mongoose = require('mongoose');
const encryption = require('../utils/encryption');
const globalConstants = require('../utils/globalConstants');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        validate: globalConstants.USERNAME_MATCH_PATTERN,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        validate: globalConstants.FIRSTNAME_MATCH_PATTERN
    },
    lastName: {
        type: String,
        required: true,
        validate: globalConstants.LASTNAME_MATCH_PATTERN
    },
    email: {
        type: String,
        required: true,
        validate: globalConstants.EMAIL_MATCH_PATTERN,
        unique: true
    },
    salt: {
        type: String,
        required: true
    },
    hashedPass: {
        type: String,
        required: true
    },
    roles: [String],
    profilePictureUrl: String
});

userSchema.method({
    authenticate: (user, password) => {
        return encryption.generateHashedPassword(user.salt, password) === user.hashedPass;
    }
});

let User = mongoose.model('User', userSchema);

module.exports = {
    User,
    userSchema,
    seedAdminUser: () => {
        User.find({})
            .then((users) => {
                if(users.length > 0) {
                    return;
                }

                let salt = encryption.generateSalt();
                let hashedPass = encryption.generateHashedPassword(salt, '123456abc');

                User.create({
                    username: 'Admin Name',
                    firstName: 'AdminFirstName',
                    lastName: 'AdminLastName',
                    email: 'admin1@gmail.com',
                    salt: salt,
                    hashedPass: hashedPass,
                    roles: ['Admin'],
                    profilePictureUrl: ''
                });
            })
    }
};
