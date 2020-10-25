const customers = require('../controllers/customer.controllers');

module.exports = (app) => {
    // create a new customer
    app.post('/customers', customers.create);

    // retrieve all customers
    app.get('/customers', customers.findAll);
    // retrieve all customers
    app.get('/users', customers.findAll);

    // retrieve a single customer with customerId
    app.get('/customers/:customerId', customers.findOne);

    // update a customer with customerId
    app.put('/customers/:customerId', customers.update);

    // delete a customer with customerId
    app.delete('/customers/:customerId', customers.delete);

    // delete all customers in the database
    app.delete('/customers', customers.deleteAll);
};
