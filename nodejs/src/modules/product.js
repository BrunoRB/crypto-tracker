'use strict';

module.exports = class Product {

	/**
	 *
	 * @param {Array} exchangesProducts exchanges
	 * @returns {Set} Name of products shared between the exchanges
	 */
	static getIntersectedProducts(...exchangesProducts) {
		let sharedProducts = new Set();
		let pmap = {};
		exchangesProducts.forEach(prodList => {
			prodList.forEach(product => {
				let name = product.id;

				if (!(name in pmap)) {
					pmap[name] = 1;
				}
				else {
					pmap[name]++;
				}

				if (pmap[name] == 2) {
					sharedProducts.add(name);
				}
			});
		});

		return sharedProducts;
	}
};