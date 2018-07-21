'use strict';

const router = require('express').Router();
const debug = require('debug')('ct-br:router:product');
const Product = require('./../modules/product.js');

/**
 * "Returns all products shared between the exchanges.
 * For example, if BTX hadproducts [A, B, C, D];
 * BNB had products [B, C, D, E]; BFX had products [C, D, E, F] -
 * the expected result would include only products C and D
 * as they are common to all three exchanges"
 */
router.get('/api/products', async function(req, res, next) {
	try {
		let pArr = CONSTS.MONEEDA_EXCHANGES.map(async exchange => {
			return Util.fetchProducts(exchange);
		});
		let prodsLists = await Promise.all(pArr);
		let data = Product.getIntersectedProducts(...prodsLists);
		res.json(Array.from(data));
	}
	catch(e) {
		logger.error(e);
		res.status(404).send(e);
	}
});

/**
 * "Returns PRODUCT’s prices on all three exchanges."
 */
router.get('/api/products/:product/prices', async function(req, res, next) {
	try {
		let product = req.params.product;

		var higher = null;
		var lower = null;
		let pArr = CONSTS.MONEEDA_EXCHANGES.map(async exchange => {
			return Util.fetchProductPrice(exchange, product).then(d => {
				if (!higher || higher < d.price) {
					higher = d.price;
				}
				if (!lower || lower > d.price) {
					lower = d.price;
				}
				return {price: d.price, exchange: exchange};
			});
		});
		let data = (await Promise.all(pArr)).map(d => {
			d.isHigher = d.price === higher;
			d.isLower = d.price === lower;
			return d;
		});

		if (Object.keys(data).length !== 3) {
			throw 'Invalid key';
		}

		res.send(data);
	}
	catch(e) {
		logger.error(e);
		res.status(404).send(e);
	}
});

module.exports = router;