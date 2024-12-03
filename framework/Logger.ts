require('dotenv').config();
const log4js = require("log4js");
const fs = require('fs');


class Logger {

    private static loggerInstance: Logger;
    private static fileName: string | undefined;

    private constructor() {}

    private static setFileName(fileName: string){
        this.fileName = fileName;
    }

    public static getInstance(fileName: string): Logger {
        this.setFileName(fileName);
        if (!this.loggerInstance) {
            Logger.loggerInstance = log4js.getLogger(this.fileName);
        }
        return this.loggerInstance;
    }

    static loggerConfig() {
        let fieldsArray: string[] = [];

        if (process.env.LOG_LEVEL.toUpperCase() === "TRACE") {
            fieldsArray.push("cheese");
        } else {
            fieldsArray.push("out");
            fieldsArray.push("cheese");
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
                cheese: {
                    type: "file",
                    filename: `log-results/${this.fileName}.log`,
                    flags: 'w',
                    maxLogSize: 112000,
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
                    appenders: fieldsArray, level: process.env.LOG_LEVEL
                }
            },
        });
    }

    static clearLogFileIfExist(file: string){
        try {
            const path = `./log-results/${file}.log`;
            if(fs.existsSync(path)){
                //Delete file if exist
                // console.log('Exist -->>>');
                // fs.unlinkSync(path);
                // //recreate file
                // fs.writeFileSync(path, '');

                //Clear file content
                fs.writeFile(path, '', (err) => {
                    if (err) throw err;
                    console.log('File cleared!');
                });
            }
        } catch (exception){
            console.error(exception);
        }
    }

    static logStep(text: string): void {
        Logger.loggerInstance.info(text);
    }

    static getLogFileName(): string {
        return Logger.fileName + '.log';
    }

    trace(s: string) {
        Logger.loggerInstance.trace(s);
    }

    debug(s: string) {
        Logger.loggerInstance.debug(s);
    }

    info(s: string) {
        Logger.loggerInstance.info(s);
    }

    warn(s: string) {
        Logger.loggerInstance.warn(s);
    }

    error(s: string) {
        Logger.loggerInstance.error(s);
    }

    fatal(s: string) {
        Logger.loggerInstance.fatal(s);
    }
}

export default Logger