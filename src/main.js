/*eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
'use strict';

if (process.argv[2] == "--version") {
	console.info(require(__dirname + './../package.json').version);
	process.exit(0);
}
console.info('Crypto tracker', require('./../package.json').version);

const path = require('path');
const debug = require('debug')('ct-br:main');
require('./modules/globals');

process.on('unhandledRejection', (reason, p) => {
	console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

var HttpServer = require('./modules/http-server');

HttpServer(CONFS.port).then(function() {
	//
}).catch(function(err) {
	logger.error(err);
	process.exit(1);
});
