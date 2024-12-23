import {LogLevel} from "./LogLevel";

const log4js = require('log4js');


export class Log4jsConfiguration {

    public static configureLogging(fileName: string) {
        let fieldsArray: string[] = [];
        //The target means log into file
        const file = "file";

        if (process.env.LOG_LEVEL === LogLevel.TRACE) {
            fieldsArray.push(file);
        } else {
            fieldsArray.push("out");
            fieldsArray.push(file);
        }

        log4js.configure({
            appenders: {
                out: {
                    type: 'stdout',
                    layout: {
                        type: 'pattern',
                        pattern: '%[%d{yyyy-MM-dd hh:mm:ss} %p %m%]',
                        // %d is the timestamp, %p is the level, and %m is the message.
                    },
                },
                file: {
                    type: "file",
                    filename: `logs/${fileName}.log`,
                    flags: 'w',
                    maxLogSize: 224000,
                    backups: 0,
                    layout: {
                        type: 'pattern',
                        pattern: '%d{yyyy-MM-dd hh:mm:ss} %p %m',
                        // %d is the timestamp, %p is the level, and %m is the message.
                        // Start colored message %[
                        // End colored message %]
                    }
                },
            },
            categories: {
                default: {
                    appenders: fieldsArray, level: this.getLogLevel()
                }
            },
        });
    }

    private static getLogLevel(): string {
        const logLevel = process.env.LOG_LEVEL;
        if (
            logLevel === LogLevel.TRACE ||
            logLevel === LogLevel.DEBUG ||
            logLevel === LogLevel.INFO ||
            logLevel === LogLevel.WARN ||
            logLevel === LogLevel.ERROR ||
            logLevel === LogLevel.FATAL
        ) {
            return logLevel;
        }
        return LogLevel.DEBUG;
    }

}

// export default Log4jsConfiguration;