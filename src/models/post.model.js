const db = require('./database');
var passwordHash = require('password-hash');

const tableName = 'post';

// constructor
function Post(post) {
    this.buy_type = post.buy_type;
    this.product_type = post.product_type;
    this.title = post.title;
    this.img = post.img;
    this.description = post.description;
    this.latitude = post.latitude;
    this.longitude = post.longitude;
    this.location_detail = post.location_detail;
    this.service_price = post.service_price;
    this.product_price = post.product_price;
    this.expire_datetime = post.expire_datetime;
    this.is_done = post.is_done ? post.is_done : false;
    this.percent_discount = post.percent_discount;
    this.limit_amount = post.limit_amount;
    this.user_ID = post.user_ID;
    this.cuurent_user_amount = post.cuurent_user_amount ? post.cuurent_user_amount : 0;
    this.updated_at = new Date();
    this.created_at = new Date();
}

Post.create = (post, result) => {
    const sql = `INSERT INTO ${tableName} SET ? `;
    db.query(sql, post, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...post });
    });
};

Post.findById = (id, result) => {
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
Post.getAll = (post, result) => {
    let ids = post.ids.length > 0 ? `AND ID NOT IN ('` + post.ids.join("','") + `')` : '';
    const search = post.search
        ? ` AND (title LIKE '%${post.search}%' OR 
     description LIKE '%${post.search}%')`
        : '';

    const sql = `SELECT ID, title ,img ,service_price ,product_price ,percent_discount,limit_amount FROM ${tableName} WHERE buy_type = '${post.buy_type}' ${ids} ${search} ORDER BY created_at DESC LIMIT ${post.limit}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

// update customers by id
Post.updateById = (id, post, result) => {
    const sql = `UPDATE ${tableName} SET 
    product_type = ?,
    title = ?,
    img = ?,
    description = ?,
    latitude = ?,
    longitude = ?,
    location_detail = ?,
    service_price = ?,
    product_price = ?,
    expire_datetime = ?,
    percent_discount = ?,
    limit_amount = ?
    WHERE ID = ?`;

    db.query(
        sql,
        [
            post.product_type,
            post.title,
            post.img,
            post.description,
            post.latitude,
            post.longitude,
            post.location_detail,
            post.service_price,
            post.product_price,
            post.expire_datetime,
            post.percent_discount,
            post.limit_amount,
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

            result(null, { id, ...post });
        },
    );
};

// remove single customer with the id
Post.remove = (id, result) => {
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
Post.removeAll = (result) => {
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

module.exports = Post;
