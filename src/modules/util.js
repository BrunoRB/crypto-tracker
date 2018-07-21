'use strict';

const https = require('https');
const debug = require('debug')('ct-br:util');

module.exports = {

	_moonedaFetch: function(path) {
		let opts = {
			host: 'api.moneeda.com',
			path: path,
			port: 443,
			headers:{
				Authorization: `Bearer ${CONFS.MONEEDA_TOKEN}`
			}
		};

		return new Promise((resolve, reject) => {
			https.get(opts, function(response) {
				let body = '';
				response.on('data', function(d) {
					body += d;
				});

				response.on('end', function() {
					try {
						if (response.statusCode === 200) {
							resolve(JSON.parse(body));
						}
						else {
							reject(JSON.parse(body));
						}
					}
					catch(e) {
						reject(e);
					}
				});
			}).on('error', reject).end();
		});
	},

	fetchProducts: function(exchange) {
		debug('Fetching', `/api/exchanges/${exchange}/products`);
		return this._moonedaFetch(`/api/exchanges/${exchange}/products`);
	},

	fetchProductPrice: function(exchange, prod) {
		debug('Fetching', `/api/exchanges/${exchange}/ticker?product=${prod}`);
		return this._moonedaFetch(`/api/exchanges/${exchange}/ticker?product=${prod}`);
	}
};