# mongo-logger

A small logging utility for use in mongo shell scripts.

I initially created this utility because I had the requirement to log messages from mongo shell scripts with different levels and timestamps.
To my surprise no such things exists yet (at least not publicly available, see https://stackoverflow.com/a/7250148).
This was the only public code I was able to find (and the repository is archived): https://github.com/rsdoiel/mongo-modules/blob/master/mongo-modules.js .

## Functionality

This logger offers a bunch of small, convenient features for you:
* timestamping
* formatting (at least a tiny bit)
* different log levels (DEBUG, INFO, WARN, ERROR, FATAL)
* inclusion of script name in each message
* easy to use
* 100% vanilla JS and compatible with mongo shell (tested with MongoDB version 3.1+)

## Usage

### Documentation
```javascript
// Include the logger class
load('mongo-logger.js');
```
```javascript
// This may seem weird, but '(new Error).fileName' will resolve to the name of the script itself
var log = new MongoLogger((new Error).fileName);

// Alternatively you can also set the name manually
var log = new MongoLogger("myScript.js");
```
```javascript
// Get the log level, will return "INFO" by default
print(log.getLogLevel());
```
```javascript
// Set the log level
log.setLogLevel(log.levels.DEBUG);
```
```javascript
// log something
log.debug("This is a debug message.");
log.info("This is a info message.");
log.warn("This is a warning message.");
log.error("This is an error message.");
log.fatal("This is a fatal error message.");
```
### Example
```javascript
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
```
#### Output
```
Current log level: INFO
2020-10-29 23:46:02  INFO  [myScript.js] : This is a info message.
2020-10-29 23:46:02  WARN  [myScript.js] : This is a warning message.
2020-10-29 23:46:02  ERROR [myScript.js] : This is an error message.
2020-10-29 23:46:02  FATAL [myScript.js] : This is a fatal error message.
Current log level: DEBUG
2020-10-29 23:46:02  DEBUG [myScript.js] : This is a debug message.
2020-10-29 23:46:02  INFO  [myScript.js] : This is a info message.
2020-10-29 23:46:02  WARN  [myScript.js] : This is a warning message.
2020-10-29 23:46:02  ERROR [myScript.js] : This is an error message.
2020-10-29 23:46:02  FATAL [myScript.js] : This is a fatal error message.
```

## Planned Features
* support for logging objects (maybe using `printjson`?)
* improved formatting support if possible

## Known bugs

Currently none.