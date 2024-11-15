require('dotenv').config();
const log4js = require("log4js");


class Logger {

    private logger;

    constructor(fileName: string) {
        this.loggerConfig(fileName);

        this.logger = log4js.getLogger(fileName);

    }

    private loggerConfig(fileName: string) {
        log4js.configure({
            appenders: {
                out: {type: 'stdout'},
                cheese: {
                    type: "file",
                    filename: `log-results/${fileName}.log`,
                    maxLogSize: 112000,
                    backups: 0,
                }
            },
            categories: {default: {appenders: ["cheese", "out"], level: process.env.LOG_LEVEL}},
        });
    }

    testLog() {
        this.logger.trace("Entering cheese testing");
        this.logger.debug("Got cheese.");
        this.logger.info("Cheese is Comté.");
        this.logger.warn("Cheese is quite smelly.");
        this.logger.error("Cheese is too ripe!");
        this.logger.fatal("Cheese was breeding ground for listeria.");
    }

    trace(s: string) {
        this.logger.trace(s);
    }

    debug(s: string) {
        this.logger.debug(s);
    }

    info(s: string) {
        this.logger.info(s);
    }

    warn(s: string) {
        this.logger.warn(s);
    }

    error(s: string) {
        this.logger.error(s);
    }

    fatal(s: string) {
        this.logger.fatal(s);
    }
}

export default Logger