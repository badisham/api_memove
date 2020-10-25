const users = require('../controllers/user.controllers');

module.exports = (app) => {
    // create a new user
    app.post('/user', users.create);

    // retrieve all users
    app.get('/users', users.findAll);

    // retrieve a single user with userId
    app.get('/user/:userId', users.findOne);

    // update a user with userId
    app.put('/user/:userId', users.update);

    // delete a user with userId
    app.delete('/user/:userId', users.delete);

    // delete all users in the database
    app.delete('/users', users.deleteAll);

    app.post('/user/login', users.login);

    app.post('/user/req-otp', users.requestOTP);

    app.post('/user/verify', users.verify);
};
