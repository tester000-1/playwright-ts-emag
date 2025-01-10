import {Page} from "@playwright/test";

require('dotenv').config();
import Logger from "./Logger";

export class Browser {

    private logger: Logger;
    private page: Page;

    constructor(logger: Logger, page: Page) {
        this.logger = logger;
        this.page = page;
    }

    async visitBaseUrl() {
        this.logger.debug('Navigated to page: "' + process.env.BASE_URL + '"');
        await this.page.goto(process.env.BASE_URL);
    }

    async openPage(path: string) {
        this.logger.debug('Navigated to page: "' + process.env.BASE_URL + path + '"');
        await this.page.goto(process.env.BASE_URL + path);
    }

    async scrollToTop() {
        this.logger.debug('Scroll to the Top of the page');
        await this.page.evaluate(() => window.scroll(0, 0));
    }

    async scrollToCoordinates(xCoordinate: number, yCoordinate: number) {
        await this.page.evaluate(() => window.scroll(xCoordinate, yCoordinate));
    }

}

export default Browser;