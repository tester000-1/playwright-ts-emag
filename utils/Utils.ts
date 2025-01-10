import {compareAsc, format} from "date-fns";
import Logger from "../framework/Logger";
import {Page} from "@playwright/test";

const fs = require('fs');


class Utils {

    async wait(page: Page, time: number) {
        await page.waitForTimeout(time);
    }

    async getTimeNow() {
        return format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS");
    }

    async clearLogFileIfExist(file: string) {
        try {
            const path = `./logs/${file}.log`;
            if (fs.existsSync(path)) {
                //Clear file content
                await fs.writeFile(path, '', (err) => {
                    if (err) throw err;
                });
            }
        } catch (exception) {
            const logger = Logger.getInstance();
            //logger.loggerConfig();
            logger.error(exception);
        }
    }

    async deleteFileIfExist(file: string) {
        try {
            const path = `./logs/${file}.log`;
            if (fs.existsSync(path)) {
                //Delete file if exist
                await fs.unlinkSync(path);
                //recreate file
                await fs.writeFileSync(path, '');
            }
        } catch (exception) {
            const logger = Logger.getInstance();
            //logger.loggerConfig();
            logger.error(exception);
        }
    }

}

export default Utils;