const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// default route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my application!' });
});

require('./src/routes/user.routes.js')(app);
require('./src/routes/post.routes.js')(app);
require('./src/routes/productType.routes.js')(app);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
