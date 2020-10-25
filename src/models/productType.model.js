const db = require('./database');
var passwordHash = require('password-hash');

const tableName = 'product_type';

// constructor
function ProductType(productType) {
    this.name = productType.name;
    this.enable = productType.enable;
}

ProductType.create = (productType, result) => {
    const sql = `INSERT INTO ${tableName} SET ? `;
    // result(null, { sql: sql, productType: productType });
    db.query(sql, productType, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...productType });
    });
};

ProductType.findById = (id, result) => {
    const sql = `SELECT * FROM ${tableName} WHERE ID = '${id}'`;
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
ProductType.getAll = (result) => {
    const sql = `SELECT ID,name FROM ${tableName} WHERE enable = '1'`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

// update customers by id
ProductType.updateById = (id, productType, result) => {
    const sql = `UPDATE ${tableName} SET 
    name = ?
    WHERE ID = ?`;

    db.query(sql, [productType.name, id], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Customer with the id
            result({ result: 'not_found' }, null);
            return;
        }

        result(null, { id, ...productType });
    });
};

// remove single customer with the id
ProductType.remove = (id, result) => {
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
ProductType.removeAll = (result) => {
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

module.exports = ProductType;
