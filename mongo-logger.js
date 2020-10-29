function MongoLogger(srcComponent) {

    var component = srcComponent;

    this.levels = {
        FATAL: 0,
        ERROR: 1,
        WARN: 2,
        INFO: 3,
        DEBUG: 4
    };

    // default log level
    var level = this.levels.INFO;

    var log = function (level, msg)	{
        if(msg === null || msg === undefined) {
            msg = "";
        }

        var header = (now() + "  " + level).padEnd(27, " ");
        print(header + "[" + component + "] : " + msg);
    };

    var now = function () {
        var dateNow = new Date().toISOString();
        dateNow = dateNow.replace("T", " ").slice(0, -5);
        return dateNow;
    };

    this.setLogLevel = function(newLevel) {
        level = newLevel;
    };

    this.getLogLevel = function() {
        for (var [key, value] of Object.entries(this.levels)) {
          if(level === value) {
            return key;
          }
        }
    };

    this.debug = function (msg) {
        if(level >= this.levels.DEBUG) {
            log("DEBUG", msg);
        }
    };

    this.info = function (msg) {
        if(level >= this.levels.INFO) {
            log("INFO", msg);
        }
    };

    this.warn = function (msg) {
        if(level >= this.levels.WARN) {
            log("WARN", msg);
        }
    };

    this.error = function (msg) {
        if(level >= this.levels.ERROR) {
            log("ERROR", msg);
        }
    };

    this.fatal = function (msg) {
        if(level >= this.levels.FATAL) {
            log("FATAL", msg);
        }
    };

    // I love dynamically-typed languages :)
    if(srcComponent === null || srcComponent === undefined || srcComponent.trim().length === 0) {
        component = (new Error).fileName;
        this.warn("Using default component name since no source component name has been set when creating the Logger.");
    }
}