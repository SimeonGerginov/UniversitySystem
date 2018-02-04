const encryption = require('../utils/encryption');
const User = require('mongoose').model('User');

module.exports = {
    register: (req, res) => {
        if (req.user) {
            return res.status(400).json({errorMessage: 'You are already logged in.'})
        }

        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, req.body.password);

        const reqUser = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            salt: salt,
            hashedPass: hashedPass,
            roles: ['Student'],
            profilePictureUrl = ''
        };

        User.create(reqUser)
            .then((user) => {
                return res.send(user);
            })
            .catch((err) => {
                return res.status(400).json({ errorMsg: err });
            });
    },

    login: (req, res) => {
        let reqUser= req.body;

        User.findOne({ username: reqUser.username })
            .then((user) => {
                if(!user) {
                    return res.status(400).json({ errorMsg: 'User was not found.' });
                }

                if(!user.authenticate(reqUser.password)){
                    return res.status(400).json({ errorMsg: 'User is not authenticated.' });
                }

                return res.send(user);
            })
            .catch((err) => {
                res.send({errorMsg: err});
            });
    },

    logout: (req, res) => {
        req.logout();
        return res.status(200).json({ infoMsg: 'You are logged out.' });
    }
};