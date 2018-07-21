'use strict';

var winston = require('winston'),
	path = require('path'),
	os = require('os'),
	util = require('util'),
	fs = require('fs');

function isWritable(filename) {
	try {
		if (!fs.existsSync(filename)) {
			fs.accessSync(path.dirname(filename), fs.W_OK);
			return true;
		}
		else {
			fs.accessSync(_logFilename, fs.W_OK);
			return true;
		}
	}
	catch (err) {
		return false;
	}
}

// #75910, log not writable can't kill the app
var _logFilename = path.join(os.tmpdir(), 'multiselfie.js.log');
let i = 0;
while (!isWritable(_logFilename) && i < 100) {
	_logFilename = path.join(os.tmpdir(), 'multiselfie.' + i + '.js.log');
	i++;
}

var _transports = [];

if (!isWritable(_logFilename)) { // fallback to console.
	_transports = [new (winston.transports.Console)()];
}
else {
//	_transports = PROD_CONFS.isProduction ?
//		[new (winston.transports.File)({ timestamp: true, filename: _logFilename })] :
//		[
//			new (winston.transports.Console)({ timestamp: true }),
//			new (winston.transports.File)({ timestamp: true, filename: _logFilename })
//		];
	_transports = [
		new (winston.transports.Console)({ timestamp: true }),
		new (winston.transports.File)({ timestamp: true, filename: _logFilename })
	];
}

var _log = new (winston.Logger)({
	transports: _transports,
	exitOnError: false
});

var logger = {
	filename: _logFilename,

	info: function(...data) {
		this._log('info', ...data);
	},

	warning: function(...data) {
		this._log('warning', ...data);
	},

	debug: function(...data) {
		this._log('debug', ...data);
	},

	error: function(...data) {
		this._log('error', ...data);
	},

	_log: function(level, ...data) {
		if (!util.isArray(data)) {
			data = [data];
		}

		data.forEach(function(d) {
			_log.log(level, d);
		});
	}
};

module.exports = logger;