import {LogLevel} from "./LogLevel";

const log4js = require('log4js');


export class Log4jsConfiguration {

    public static configureLogging(fileName: string) {
        let fieldsArray: string[] = [];
        //The target means log into file
        const file = "file";
        const out = "out";
        fieldsArray.push(file);
        fieldsArray.push(out);

        log4js.configure({
            appenders: {
                out: {
                    type: 'stdout',
                    layout: {
                        type: 'pattern',
                        pattern: '%[%d{yyyy-MM-dd hh:mm:ss} %p %m%]',
                        // %d is the timestamp, %p is the level, and %m is the message.
                    }
                },
                file: {
                    type: [file],
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
                }
            },
            categories: {
                default: {
                    appenders: fieldsArray,
                    level: this.getLogLevel()
                },
                consoleOnly: {
                    appenders: [out],
                    level: this.getLogLevel()
                },
                traceOnly: {
                    appenders: [file],
                    level: LogLevel.TRACE
                }
            }
        });

    }

    private static getLogLevel(): string {
        const logLevel = process.env.LOG_LEVEL;
        if (Object.values(LogLevel).includes(logLevel as LogLevel)) {
            return logLevel;
        }
        return LogLevel.DEBUG;
    }

}

// export default Log4jsConfiguration;