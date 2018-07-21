/*eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
'use strict';

module.exports = async function(HTTP_PORT = 8081) {
	const debug = require('debug')('ct-br:http-server');
	const fs = require('fs');
	const path = require('path');

	var express = require('express');

	var bodyParser = require('body-parser');

	var app = global.app = express();

	app.disable('x-powered-by');

	// deal with POST requests
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(require('compression')());

	// app.use('', express.static(path.join(__dirname, '../../clientvue/www'), {'index': ['index.html']}));
	// app.use('/test', express.static(path.join(__dirname, '../../clientvue'), {'index': ['index.html']}));

	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Credentials', true);
		if (!CONFS.isProduction) {
			res.header('Access-Control-Allow-Origin', req.get('origin'));
		}
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});

	fs.readdirSync(`${__dirname}/../routes/`).forEach(function(name) {
		var r = require(`${__dirname}/../routes/${name}`);
		app.use(r);
	});

	// catch all, anything not found will point to index.html
	app.get('/*', function(req, res, next) {
		let headers = req.headers;
		if (req.method !== 'GET') {
			next();
		}
		else if (!headers || typeof headers.accept !== 'string') {
			next();
		}
		else {
		// return res.sendFile(path.join(__dirname, '../../clientvue/www/index.html'));
		}
	});

	/*
	 * PROCESS STUFF
	 */
	process.on('restart', function (restartCallback, newExitCode) {
		// do whatever you want before application's crash
		// and when you're done - call the callback to restart the process
		console.info("Restarting");
		restartCallback(0);
	});

	process.on('uncaughtException', function(err) {
		var separator = new Array(80).join('=');
		const logger = require('./logger');
		if(err.errno === 'EADDRINUSE') {
			console.error(separator);
			console.error('You probably already have a ct-br application running.');
			console.error('Please shut it down before trying to open a new one.');
			console.error(separator);
		}
		else {
			console.error(separator);
			console.error('Something went wrong, please try it again.');
			console.error('Check the log file at ' + logger.filename);
			console.error(separator);
		}
		debug(err);

		logger.error(err);

		process.exit(1);
	});

	// error handler
	app.use(async function(err, req, res, next) {
		const logger = require('./logger');
		logger.error(err);
		var estr = JSON.stringify(err);
		res.status(400).send(
			(!CONFS.isProduction || await req.isAdmin()) && estr && estr !== '{}' ?
				JSON.stringify(err) : 'Something bad happened :('
		);
	});

	await new Promise((resolve) => {
		app.listen(HTTP_PORT, function () {
			console.info("http://localhost:" + HTTP_PORT); //the server object listens on port 3000
			resolve();
		});
	});

	return app;
};
