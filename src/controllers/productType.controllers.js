const ProductType = require('../models/productType.model');

// create and save a new productType
exports.create = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    const body = req.body;
    // create new productType
    const productType = new ProductType({
        name: body.name,
        enable: body.enable,
    });

    ProductType.create(productType, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the ProductType.',
            });

        res.send({ message: 'productType was created successfully!', data });
    });
};

// retrieve all productTypes from the database
exports.findAll = (req, res) => {
    ProductType.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieve productTypes.',
            });

        res.send([...data]);
    });
};

// find a single productType with the productTypeId
exports.findOne = (req, res) => {
    const { productTypeId } = req.params;
    ProductType.findById(productTypeId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({
                      message: `Not found productTypes with id ${productTypeId}`,
                  })
                : res.status(500).send({
                      message: `Could not retrieve productType with id ${productTypeId}`,
                  });
        }

        res.send({ ...data });
    });
};

// update a cutomer identified by the productTypeId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: 'Content can not be empty!' });

    const { productTypeId } = req.params;
    const productType = new ProductType(req.body);

    ProductType.updateById(productTypeId, productType, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({
                      message: `Not found productType with id ${productTypeId}`,
                  })
                : res.status(500).send({
                      message: `Could not update productType with id ${productTypeId}`,
                  });
        }

        res.send({ message: 'productType was updating successfully!', data });
    });
};

// delete a productType with the specified productTypeId in the request
exports.delete = (req, res) => {
    const { productTypeId } = req.params;

    ProductType.remove(productTypeId, (err) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === 'not_found'
                ? res.status(404).send({
                      message: `Not found productType with id ${productTypeId}`,
                  })
                : res.status(500).send({
                      message: `Could not delete productType with id ${productTypeId}`,
                  });
        }

        res.send({ message: 'productType was deleted successfully!' });
    });
};

// delete all productTypes from the database
exports.deleteAll = (req, res) => {
    ProductType.removeAll((err) => {
        if (err) {
            if (err.result === 'not_found') {
                res.status(404).send({ message: 'Not found any productTypes' });
            } else {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieve productTypes.',
                });
            }
        }

        res.send({ message: 'All productTypes was deleted successfully!' });
    });
};
