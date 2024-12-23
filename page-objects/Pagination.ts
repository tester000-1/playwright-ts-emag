import Logger from "../framework/Logger";
import {Page} from "@playwright/test";
import {Timeout} from "../utils/Timeout";

class Pagination {

    private logger: Logger;
    private page: Page;

    constructor(logger: Logger, page: Page) {
        this.logger = logger;
        this.page = page;
    }

    async getPageNumerLink(number, timeout?){
        this.logger.debug('return page number link: ' + number);
        const loc = this.page.getByRole('link', {name: number, exact: true});
        await loc.waitFor({state: "visible", timeout: Timeout.EXTRA_EXTENSIVE});
        const isVisiblePagingNumber = await loc.isVisible(timeout);
        this.logger.debug('page number link visibility: ' + isVisiblePagingNumber);
        return isVisiblePagingNumber;
    }

    async clickPageNumerLink(number, timeout?){
        this.logger.debug('Click page number link: ' + number);
        await this.page.getByRole('link', { name: number, exact: true }).click(timeout);
    }

    async isActivePageNumer(number, timeout?){
        this.logger.debug('Get active page number link: ' + number);
        const loc = this.page.locator('//li[@class="active"]//a[text()="' + number + '"]');
        await loc.waitFor({state: "visible", timeout: Timeout.EXTRA_EXTENSIVE});
        const isActivePageNumber = await loc.isVisible(timeout);
        this.logger.debug('Page number link is active: ' + isActivePageNumber);
        return isActivePageNumber;
    }

}

export default Pagination;