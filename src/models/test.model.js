const db = require('./database');
var passwordHash = require('password-hash');

const tableName = 'user';

// constructor
function User(user) {
    this.username = user.username;
    this.password = user.password ? passwordHash.generate(user.password) : null;
    this.img = user.img;
    this.name_lastname = user.name_lastname;
    this.student_id = user.student_id;
    this.faculty = user.faculty;
    this.branch = user.branch;
    this.email = user.email;
    this.tel = user.tel;
}

User.create = (user, result) => {
    const sql = `INSERT INTO ${tableName} SET ? `;
    db.query(sql, user, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...user });
    });
};

User.findById = (id, result) => {
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
User.getAll = (result) => {
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
User.updateById = (id, user, result) => {
    const sql = `UPDATE ${tableName} SET 
    username = ?,
    img = ?,
    name_lastname = ?,
    student_id = ?,
    faculty = ?,
    branch = ?,
    tel = ? WHERE ID = ?`;

    db.query(
        sql,
        [
            user.username,
            user.img,
            user.name_lastname,
            user.student_id,
            user.faculty,
            user.branch,
            user.tel,
            id,
        ],
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

            result(null, { id, ...user });
        },
    );
};

// remove single customer with the id
User.remove = (id, result) => {
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
User.removeAll = (result) => {
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

module.exports = User;
