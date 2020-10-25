const post = require('../controllers/post.controllers');

module.exports = (app) => {
    // create a new post
    app.post('/post', post.create);

    // retrieve all post
    app.post('/posts', post.findAll);

    // retrieve a single post with postId
    app.get('/post/:postId', post.findOne);

    // update a post with postId
    app.put('/post/:postId', post.update);

    // delete a post with postId
    app.delete('/post/:postId', post.delete);

    // delete all post in the database
    app.delete('/posts', post.deleteAll);
};
