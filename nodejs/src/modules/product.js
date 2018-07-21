'use strict';

module.exports = class Product {

	/**
	 * Given a variable number of exchanges, each an array with a product list,
	 * computes the intersection between all of them.
	 *
	 * Time complexity: Θ(n) since it does a single iteration over all the parameters.
	 *
	 * Ex usage:
	 * 	Product.getIntersectedProducts(
	 *	 	[{prod1}, {prod2}, ...], // exchange 1
	 * 		[{prod1}, {prod2}, {prod3}, ...], // exchange 2
	 * 		...
	 * 	)
	 * Check test/ProductTest.js for examples.
	 *
	 * @param {...} ...exchangesProducts Variable number of exchange arrays
	 * @returns {Set} Name/id of products shared between all the exchanges
	 */
	static getIntersectedProducts(...exchangesProducts) {
		let sharedProducts = new Set();
		let pmap = {};
		exchangesProducts.forEach((prodList, exchangeIndex) => {
			prodList.forEach(product => {
				let name = product.id;

				if (!(name in pmap)) {
					pmap[name] = new Set();
				}

				// Some exchanges have the same product listed more than once,
				// but the set in pmap[name] will hold one value per exchange...
				pmap[name].add(exchangeIndex);

				// ...so if the set has N itens (pmap[name].size),
				// where N = number of exchanges (exchangesProducts.length)
				// we have found a product that's present in all of them
				if (pmap[name].size == exchangesProducts.length) {
					sharedProducts.add(name);
				}
			});
		});

		return sharedProducts;
	}
};