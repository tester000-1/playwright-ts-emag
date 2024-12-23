import Logger from "../framework/Logger";
import {Page} from "@playwright/test";


class TopNavigation {

    private logger: Logger;
    private page: Page;

    constructor(logger: any, page: Page) {
        this.logger = logger;
        this.page = page;
    }

    async clickLocator(title, timeout?: any){
        this.logger.debug('Click link locator: ' + title)
        await this.page.getByRole('link', { name: title }).click(timeout);
    }

    async clickLinkLocatorExactName(title, exactName: boolean, timeout?: any){
        this.logger.debug('Get locator by link and exact name: ' + title)
        await this.page.getByRole('link', { name: title, exact: exactName }).click(timeout);
    }

}

export default TopNavigation;