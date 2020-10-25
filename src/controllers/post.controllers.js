const Post = require('../models/post.model');

// create and save a new post
exports.create = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    const body = req.body;
    // create new post
    const post = new Post({
        buy_type: body.buy_type,
        product_type: body.product_type,
        title: body.title,
        img: body.img,
        description: body.description,
        latitude: body.latitude,
        longitude: body.longitude,
        location_detail: body.location_detail,
        service_price: body.service_price,
        product_price: body.product_price,
        percent_discount: body.percent_discount,
        limit_amount: body.limit_amount,
        expire_datetime: body.expire_datetime,
        user_ID: body.user_ID,
    });

    console.log(post);

    Post.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the post.',
            });

        res.send({ message: 'post was created successfully!', data });
    });
};

// retrieve all posts from the database
exports.findAll = (req, res) => {
    const { limit, buyType, search } = req.query;
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    const post = {
        ids: req.body,
        limit: limit,
        buy_type: buyType,
        search: search,
    };
    Post.getAll(post, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieve posts.',
            });

        res.send(data);
    });
};

// find a single post with the postId
exports.findOne = (req, res) => {
    const { postId } = req.params;
    Post.findById(postId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({
                      message: `Not found posts with id ${postId}`,
                  })
                : res.status(500).send({
                      message: `Could not retrieve post with id ${postId}`,
                  });
        }

        res.send(data);
    });
};

// update a cutomer identified by the postId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    const { postId } = req.params;
    const post = new Post(req.body);

    Post.updateById(postId, post, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({
                      message: `Not found post with id ${postId}`,
                  })
                : res.status(500).send({
                      message: `Could not update post with id ${postId}`,
                  });
        }

        res.send({ message: 'post was updating successfully!', data });
    });
};

// delete a post with the specified postId in the request
exports.delete = (req, res) => {
    const { postId } = req.params;

    Post.remove(postId, (err) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({
                      message: `Not found post with id ${postId}`,
                  })
                : res.status(500).send({
                      message: `Could not delete post with id ${postId}`,
                  });
        }

        res.send({ message: 'post was deleted successfully!' });
    });
};

// delete all posts from the database
exports.deleteAll = (req, res) => {
    Post.removeAll((err) => {
        if (err) {
            if (err.result === 'not_found') {
                res.status(404).send({ message: 'Not found any posts' });
            } else {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieve posts.',
                });
            }
        }

        res.send({ message: 'All posts was deleted successfully!' });
    });
};
