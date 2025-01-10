import {LogLevel} from "./LogLevel";

require('dotenv').config();
const log4js = require("log4js");

class Logger {

    private static loggerInstance: Logger;
    private static fileName: string | undefined;
    private static logger: Logger;
    private static traceLogger: Logger;

    private constructor() {}

    public static setFileName(fileName: string) {
        this.fileName = fileName;
    }

    public static getInstance(fileName?: string): Logger {
        this.setFileName(fileName);
        if (!this.loggerInstance) {
            Logger.loggerInstance = new Logger();
            this.logger = log4js.getLogger();
            //Initialize TRACE logger
            this.traceLogger = log4js.getLogger('traceOnly');
        }
        return this.loggerInstance;
    }

    logStep(text: string): void {
        Logger.logger.info(text);
    }

    getLogFileName(): string {
        return Logger.fileName + '.log';
    }

    trace(s: string) {
        Logger.traceLogger.trace(s);
    }

    debug(s: string) {
        Logger.logger.debug(s);
    }

    info(s: string) {
        Logger.logger.info(s);
    }

    warn(s: string) {
        Logger.logger.warn(s);
    }

    error(s: string) {
        Logger.logger.error(s);
    }

    fatal(s: string) {
        Logger.logger.fatal(s);
    }
}

export default Logger