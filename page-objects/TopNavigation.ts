import Logger from "../framework/Logger";
import {Page} from "@playwright/test";
import {Timeout} from "../utils/Timeout";


class TopNavigation {

    private logger: Logger;
    private page: Page;

    constructor(logger: Logger, page: Page) {
        this.logger = logger;
        this.page = page;
    }

    async clickLocator(title: string, timeout?: Timeout){
        this.logger.debug('Click link locator: ' + title)
        await this.page.getByRole('link', { name: title }).click({timeout});
    }

    async clickLinkLocatorExactName(title: string, exactName: boolean, timeout?: Timeout){
        this.logger.debug('Get locator by link and exact name: ' + title)
        await this.page.getByRole('link', { name: title, exact: exactName }).click({timeout});
    }

}

export default TopNavigation;