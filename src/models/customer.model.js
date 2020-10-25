const db = require('./database');

const tableName = 'user';

// constructor
function Customer(customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
}

// create new customer
Customer.create = (customer, result) => {
    const sql = `INSERT INTO ${tableName} SET ?`;
    db.query(sql, customer, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...customer });
    });
};

// get single customer by id
Customer.findById = (id, result) => {
    const sql = `SELECT * FROM ${tableName} WHERE id = ${id}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length === 0) {
            result({ result: 'not_found' }, null);
            return;
        }

        result(null, res[0]);

        // not found Customer with the id
    });
};

// get all customers
Customer.getAll = (result) => {
    const sql = `SELECT * FROM ${tableName}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

// update customers by id
Customer.updateById = (id, customer, result) => {
    const sql = `UPDATE ${tableName} SET email = ?, name = ?, active = ? WHERE id= ?`;

    db.query(
        sql,
        [customer.email, customer.name, customer.active, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found Customer with the id
                result({ result: 'not_found' }, null);
                return;
            }

            result(null, { id, ...customer });
        },
    );
};

// remove single customer with the id
Customer.remove = (id, result) => {
    const sql = `DELETE FROM ${tableName} WHERE id = ?`;
    db.query(sql, id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            result({ result: 'not_found' }, null);
            return;
        }

        result(null, res);
    });
};

// remove all customers
Customer.removeAll = (result) => {
    const sql = `DELETE FROM ${tableName}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            result({ result: 'not_found' }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Customer;
