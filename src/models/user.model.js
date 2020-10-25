const db = require('./database');
const Mailer = require('../controllers/mailer');
var passwordHash = require('password-hash');

const tableName = 'user';

User.MakeOTP = (length) => {
    var result = '';
    // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

// constructor
function User(user) {
    this.ID = user.ID;
    this.username = user.username;
    this.password = user.password;
    this.img = user.img;
    this.name_lastname = user.name_lastname;
    this.student_id = user.student_id;
    this.faculty = user.faculty;
    this.branch = user.branch;
    this.email = user.email;
    this.tel = user.tel;
    this.otp = user.otp;
    this.enable = 0;
}

User.create = (user, result) => {
    user.password = passwordHash.generate(user.password);
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
        [user.username, user.img, user.name_lastname, user.student_id, user.faculty, user.branch, user.tel, id],
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

User.login = (user, result) => {
    const pass = user.password;
    const sql = `SELECT * FROM ${tableName} WHERE username = '${user.username}'`;

    db.query(sql, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        let get_user = res[0];
        if (res.length === 0) {
            result(null, {});
            return;
        }
        let verify = passwordHash.verify(pass, get_user.password);
        console.log(verify);
        if (verify) {
            if (get_user.enable === 0) {
                get_user.verify = false;
                User.RequestOTP(get_user.ID);
            }
            result(null, get_user);
        } else result(null, {});
    });
};

User.RequestOTP = (id, result) => {
    const otp = User.MakeOTP(4);
    const sql = `UPDATE ${tableName} SET otp = ? WHERE ID = ?`;
    db.query(sql, [otp, id], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            result({ result: 'not_found' }, null);
            return;
        }
    });
};

User.CheckOTP = (user, result) => {
    const sql = `UPDATE ${tableName} SET 
    enable = '1' , otp = '' WHERE otp = ? AND ID = ?`;
    db.query(sql, [user.otp, user.ID], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { verify: true });
    });
};

module.exports = User;
