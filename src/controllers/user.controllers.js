const User = require('../models/user.model');
const Mailer = require('../controllers/mailer');
const UploadImage = require('./upload-image.controller');

// create and save a new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    // UploadImage.uploadFile(req);
    // console.log(req.body);
    // return;
    // create new user

    let otp = User.MakeOTP(4);

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        img: req.body.img,
        name_lastname: req.body.name_lastname,
        student_id: req.body.student_id,
        faculty: req.body.faculty,
        branch: req.body.branch,
        email: req.body.email,
        tel: req.body.tel,
        otp: otp,
    });
    delete user.ID;

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the user.',
            });
        Mailer.SendOTP(req.body.email, otp);
        res.send({ ...data });
    });
};

// retrieve all users from the database
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieve users.',
            });

        res.send({ ...data });
    });
};

// find a single user with the userId
exports.findOne = (req, res) => {
    const { userId } = req.params;
    User.findById(userId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({
                      message: `Not found users with id ${userId}`,
                  })
                : res.status(500).send({
                      message: `Could not retrieve user with id ${userId}`,
                  });
        }

        res.send({ ...data });
    });
};

// update a cutomer identified by the userId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    const { userId } = req.params;
    const user = new User(req.body);

    User.updateById(userId, user, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({
                      message: `Not found user with id ${userId}`,
                  })
                : res.status(500).send({
                      message: `Could not update user with id ${userId}`,
                  });
        }

        res.send({ ...data });
    });
};

// delete a user with the specified userId in the request
exports.delete = (req, res) => {
    const { userId } = req.params;

    User.remove(userId, (err) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({
                      message: `Not found user with id ${userId}`,
                  })
                : res.status(500).send({
                      message: `Could not delete user with id ${userId}`,
                  });
        }

        res.send({ message: 'user was deleted successfully!' });
    });
};

// delete all users from the database
exports.deleteAll = (req, res) => {
    User.removeAll((err) => {
        if (err) {
            if (err.result === 'not_found') {
                res.status(404).send({ message: 'Not found any users' });
            } else {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieve users.',
                });
            }
        }

        res.send({ message: 'All users was deleted successfully!' });
    });
};

exports.login = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    User.login(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the user.',
            });

        res.send({ ...data });
    });
};

exports.requestOTP = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    User.RequestOTP(req.body.id, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the user.',
            });

        res.send({ ...data });
    });
};

exports.verify = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    const user = new User({
        otp: req.body.otp,
        ID: req.body.ID,
    });
    User.CheckOTP(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the user.',
            });

        res.send({ ...data });
    });
};
