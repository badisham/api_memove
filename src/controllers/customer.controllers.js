const Customer = require('../models/customer.model');

// create and save a new customer
exports.create = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    // create new customer
    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active,
    });

    // save customer in the database
    Customer.create(customer, (err, data) => {
        if (err) res.status(500).send({ message: err.message || 'Some error occurred while creating the customer.' });

        res.send(data);
    });
};

// retrieve all customers from the database
exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || 'Some error occurred while retrieve customers.' });

        res.send(data);
    });
};

// find a single customer with the customerId
exports.findOne = (req, res) => {
    const { customerId } = req.params;
    Customer.findById(customerId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({ message: `Not found customers with id ${customerId}` })
                : res.status(500).send({ message: `Could not retrieve customer with id ${customerId}` });
        }

        res.send(data);
    });
};

// update a cutomer identified by the customerId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    const { customerId } = req.params;
    const customer = new Customer(req.body);

    Customer.updateById(customerId, customer, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({ message: `Not found customer with id ${customerId}` })
                : res.status(500).send({ message: `Could not update customer with id ${customerId}` });
        }

        res.send(data);
    });
};

// delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
    const { customerId } = req.params;

    Customer.remove(customerId, (err) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({ message: `Not found customer with id ${customerId}` })
                : res.status(500).send({ message: `Could not delete customer with id ${customerId}` });
        }

        res.send({ message: 'Customer was deleted successfully!' });
    });
};

// delete all customers from the database
exports.deleteAll = (req, res) => {
    Customer.removeAll((err) => {
        if (err) {
            if (err.result === 'not_found') {
                res.status(404).send({ message: 'Not found any customers' });
            } else {
                res.status(500).send({ message: err.message || 'Some error occurred while retrieve customers.' });
            }
        }

        res.send(data);
    });
};
