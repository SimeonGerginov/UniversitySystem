module.exports = (app, usersController) => {
    app.post('/api/login', usersController.login);
    app.post('/api/register', usersController.register);
}
