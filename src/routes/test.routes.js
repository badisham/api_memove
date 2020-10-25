const users = require('../controllers/test.controller');

module.exports = (app) => {
    // create a new user
    app.post('/test', users.create);

    // retrieve all users
    app.post('/tests', users.findAll);

    // retrieve a single user with userId
    app.get('/user/:userId', users.findOne);

    // update a user with userId
    app.put('/user/:userId', users.update);

    // delete a user with userId
    app.delete('/user/:userId', users.delete);

    // delete all users in the database
    app.delete('/users', users.deleteAll);
};
