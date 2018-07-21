'use strict';

const assert = require('assert');
const path = require('path');

require(path.join(__dirname, '/../src/modules/globals.js'));
const Product = require(path.join(__dirname, '/../src/modules/product.js'));

describe('Product tests', function() {
	this.timeout(5000);

	/**
	 * If BTX hadproducts [A, B, C, D]; BNB had products [B, C, D, E];
	 * BFX had products [C, D, E, F] -
	 * the expected result would include only products C and D as they are common to all three
	 * exchanges.
	 */
	it('should return the intersected products', function() {
		let BTX = [
			{id: 'A'}, {id: 'B'}, {id: 'C'}, {id: 'D'}
		];
		let BNB = [
			{id: 'B'}, {id: 'C'}, {id: 'D'}, {id: 'E'}
		];
		let BFX = [
			{id: 'C'}, {id: 'D'}, {id: 'E'}, {id: 'F'}
		];

		let intersection = Product.getIntersectedProducts(BTX, BNB, BFX);
		let expected = ['C', 'D'];
		expected.forEach((id) => {
			assert.ok(intersection.has(id));
		})
	});

	xit('should fetch products', async function() {
		let pArr = CONSTS.MONEEDA_EXCHANGES.map(async exchange => {
			return Util.fetchProducts(exchange);
		});
		let prodsLists = await Promise.all(pArr);

		let data = Product.getIntersectedProducts(...prodsLists);
		console.log(data);
	});

	xit('should fetch a specific product', async function() {
		let pArr = CONSTS.MONEEDA_EXCHANGES.map(async exchange => {
			return Util.fetchProductPrice(exchange, 'ETH-SNT');
		});
		let prods = await Promise.all(pArr);

		console.log(prods);

		assert.ok(true);
	});
});