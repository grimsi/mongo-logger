load('mongo-logger.js');
var log = new MongoLogger((new Error).fileName);

print("Current log level: " + log.getLogLevel());

// the debug log will not be printed, because the level is set to "INFO" by default
log.debug("This is a debug message.");
log.info("This is a info message.");
log.warn("This is a warning message.");
log.error("This is an error message.");
log.fatal("This is a fatal error message.");

log.setLogLevel(log.levels.DEBUG);

print("Current log level: " + log.getLogLevel());

log.debug("This is a debug message.");
log.info("This is a info message.");
log.warn("This is a warning message.");
log.error("This is an error message.");
log.fatal("This is a fatal error message.");