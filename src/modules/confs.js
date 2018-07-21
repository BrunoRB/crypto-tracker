'use strict';

const debug = require('debug')('ct-br:confs');
const path = require('path');

let CONFS = {
	isProduction: false,
	MONEEDA_TOKEN: null,
	SERVER_HOST: 'http://localhost',
	SERVER_PORT: 8081
};

let PROD_CONFS = {};

try {
	PROD_CONFS = require('./../prod-confs.json');
	debug('Found production confs', Object.keys(PROD_CONFS));
}
catch(e) {
	debug('Production confs not found at ./../prod-confs.json', e);
}

if (!PROD_CONFS.MONEEDA_TOKEN && !process.env.MONEEDA_TOKEN) {
	throw `
		Missing MONEEDA_TOKEN.
		Please include it in nodejs/src/prod-confs.json or use the ENV var "MONEEDA_TOKEN".
	`;
}
// ENV always has precedence
else if (process.env.MONEEDA_TOKEN) {
	PROD_CONFS.MONEEDA_TOKEN = process.env.MONEEDA_TOKEN;
}

let token = PROD_CONFS.MONEEDA_TOKEN;

debug(
	'MONEEDA_TOKEN',
	`${token.substring(0, 4)}...${token.substring(token.length - 4)}`
);

for (let k in PROD_CONFS) {
	CONFS[k] = PROD_CONFS[k];
}

module.exports = CONFS;
