module.exports = (app, usersController) => {
    app.post('/api/login', usersController.login);
    app.post('/api/register', usersController.register);
    app.get('/api/logout', usersController.logout);
}