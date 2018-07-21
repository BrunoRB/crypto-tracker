'use strict';

var router = require('express').Router();
var debug = require('debug')('ct-br:router:product');

router.get(['/', '/products'], async function(req, res, next) {
	// https://api.moneeda.com/api/exchanges/EXCHANGE/products
});

router.get('/products/:product/prices', async function(req, res, next) {
	// https://api.moneeda.com/api/exchanges/EXCHANGE/ticker
});

module.exports = router;