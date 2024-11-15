import {Page} from "@playwright/test";

require('dotenv').config();
import Logger from "./Logger";

export class Browser {

    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    async visitBaseUrl(page: Page) {
        this.logger.info('Navigated to page: "' + process.env.BASE_URL + '"');
        await page.goto(process.env.BASE_URL);
    }

    async openPageView(page, path) {
        this.logger.info('Navigated to page: "' + process.env.BASE_URL + path + '"');
        await page.goto(process.env.BASE_URL + path);
    }

    async openLinkFacebook(page) {
        this.logger.info('Navigated to page: ' + process.env.FACEBOOK);
        await page.goto(process.env.FACEBOOK);
    }

    async scrollTop(page) {
        this.logger.info('Scroll to the Top of the page');
        await page.evaluate(() => window.scroll(0, 0));
    }

    async scrollUntilVisible(page, selector) {
        await page.evaluate(() => window.scroll(0, 1800));
    }

}

export default Browser;