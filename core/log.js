var winston = require('winston');

var config = require("./config")

var log = {};

var logger;

log.init = function() {
	var transports = new Array();

	//general: for debug use
	if(config.log.console) {
		transports.push(new (winston.transports.Console)({ 
			level: config.log.console_level 
		}) );
	}
	else{
		logger = null;
	}
	logger = new (winston.Logger)({transports: transports});

	//category
	winston.loggers.add("db", config.log.db);
	winston.loggers.add("dao", config.log.dao);
}

//for debug use
log.log = function(level, str) {
	if(logger != null) {
		logger.log(level, str);
	}
}

log.dblog = function(level, str) {
	if(config.log.db != null) {
		winston.loggers.get("db").log(level, "[db]" + str);
	}
}

log.daolog = function(level, str) {
	if(config.log.dao != null) {
		winston.loggers.get("dao").log(level, "[dao]" + str);
	}
}


module.exports = log;