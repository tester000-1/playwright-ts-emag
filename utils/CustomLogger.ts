import { LoggerLevel } from "./LoggerLevel";
import { ColorCode } from "./ColorCode";
import Utils from "../utils/Utils";
require('dotenv').config();

class CustomLogger {

    private logLevel: string | undefined;

    constructor() {
        this.logLevel = this.getLoggerProperty(process.env.LOGGER!);
    }

    getLoggerProperty(text: string) {
        if (text.toUpperCase() === LoggerLevel.DEBUG ||
            text.toUpperCase() === LoggerLevel.ERROR ||
            text.toUpperCase() === LoggerLevel.INFO ||
            text.toUpperCase() === LoggerLevel.NONE) {
            return text.toUpperCase();
        } else {
            throw new Error('CustomLogger property is not initialized!');
        }
    }

    showMessage(message: string) {
        if (this.logLevel != LoggerLevel.NONE) {
            console.log(`\x1b[${ColorCode.WHITE}m[MESSAGE] ${this.getTime()} ${message} \x1b[0m`);
        }
    }

    showHeader(message: string) {
        if (this.logLevel != LoggerLevel.NONE) {
            console.log(`\x1b[${ColorCode.GREEN_BG}m[HEADER] ${this.getTime()} ${message} \x1b[0m`);
        }
    }

    showInfo(message: string, locator: any) {
        if (this.logLevel === LoggerLevel.INFO || this.logLevel === LoggerLevel.DEBUG || this.logLevel === LoggerLevel.ERROR) {
            console.log(`\x1b[${ColorCode.CYAN}m[INFO] ${this.getTime()} ${message} Locator: ${locator} \x1b[0m`);
        }
    }

    showWarning(message: string, locator: any) {
        if (this.logLevel === LoggerLevel.DEBUG || this.logLevel === LoggerLevel.ERROR) {
            console.log(`\x1b[${ColorCode.YELLOW}m[DEBUG] ${this.getTime()} ${message} Locator: ${locator} \x1b[0m`);
        }
    }

    showError(message: string, locator: any) {
        if (this.logLevel === LoggerLevel.ERROR) {
            console.log(`\x1b[${ColorCode.RED_BG}m[ERROR] ${this.getTime()} ${message} Locator: ${locator} \x1b[0m`);
        }
    }

    private getTime() {
        return new Utils().getTimeNow();
    }

}
export default CustomLogger;