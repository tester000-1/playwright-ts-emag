import {Page} from "@playwright/test";

require('dotenv').config();
import Logger from "./Logger";

export class Browser {

    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    async visitBaseUrl(page: Page) {
        this.logger.debug('Navigated to page: "' + process.env.BASE_URL + '"');
        await page.goto(process.env.BASE_URL);
    }

    async openPageView(page, path) {
        this.logger.debug('Navigated to page: "' + process.env.BASE_URL + path + '"');
        await page.goto(process.env.BASE_URL + path);
    }

    async scrollTop(page) {
        this.logger.debug('Scroll to the Top of the page');
        await page.evaluate(() => window.scroll(0, 0));
    }

    async scrollUntilVisible(page, selector) {
        await page.evaluate(() => window.scroll(0, 1800));
    }

}

export default Browser;