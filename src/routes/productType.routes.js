const productType = require('../controllers/productType.controllers');

module.exports = (app) => {
    // create a new productType
    app.post('/product-type', productType.create);

    // retrieve all productType
    app.get('/product-type', productType.findAll);

    // retrieve a single productType with productTypeId
    app.get('/product-type/:productTypeId', productType.findOne);

    // update a productType with productTypeId
    app.put('/product-type/:productTypeId', productType.update);

    // delete a productType with productTypeId
    app.delete('/product-type/:productTypeId', productType.delete);

    // delete all productType in the database
    app.delete('/product-type', productType.deleteAll);
};
