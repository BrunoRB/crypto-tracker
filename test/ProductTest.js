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

	it('should return the intersected products 2', function() {
		// 1 to 100
		let exchange1 = new Array(100).fill(0).map((_, i) => {
			return {id: i + 1}
		});
		// 100 to 199
		let exchange2 = new Array(100).fill(0).map((_, i) => {
			return {id: i + 100}
		});
		// 95 to 105
		let exchange3 = new Array(10).fill(0).map((_, i) => {
			return {id: i + 95}
		});
		// 1 to 200
		let exchange4 = new Array(200).fill(0).map((_, i) => {
			return {id: i + 1}
		});

		let intersection = Product.getIntersectedProducts(exchange1, exchange2, exchange3, exchange4);
		let expected = [100];
		expected.forEach((id) => {
			assert.ok(intersection.has(id), id);
		})
	});

	// what's returned from the API can vary with time,
	// so this is only for debugging purposes
	xit('should fetch products', async function() {
		let pArr = CONSTS.MONEEDA_EXCHANGES.map(async exchange => {
			return Util.fetchProducts(exchange);
		});
		let prodsLists = await Promise.all(pArr);

		let data = Product.getIntersectedProducts(...prodsLists);
		console.log(data);
	});

	// what's returned from the API can vary with time,
	// so this is only for debugging purposes
	xit('should fetch a specific product', async function() {
		let pArr = CONSTS.MONEEDA_EXCHANGES.map(async exchange => {
			return Util.fetchProductPrice(exchange, 'ETH-SNT');
		});
		let prods = await Promise.all(pArr);

		console.log(prods);

		assert.ok(true);
	});
});