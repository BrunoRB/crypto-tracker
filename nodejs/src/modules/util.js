'use strict';

const https = require('https');

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
				if (response.statusCode === 200) {
					let body = '';
					response.on('data', function(d) {
						body += d;
					});

					response.on('end', function() {
						try {
							resolve(JSON.parse(body));
						}
						catch(e) {
							reject(e);
						}
					});
				}
				else {
					// TODO message
					reject(response.statusCode);
				}
			}).on('error', reject).end();
		});
	},

	fetchProducts: function(exchange) {
		return this._moonedaFetch(`/api/exchanges/${exchange}/products`);
	}
};