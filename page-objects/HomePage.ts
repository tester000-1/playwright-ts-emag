import BasePage from "./BasePage";
import {Page} from "@playwright/test";
import {Timeout} from "../utils/Timeout";
import Logger from "../framework/Logger";

class HomePage extends BasePage{

    constructor(logger: Logger, page: Page) {
        super(logger, page);
    }

    async getHeadingName(title: string, timeout?: Timeout){
        this.logger.debug('Return element with title ' + title);
        const loc = this.page.getByRole('heading', { name: title });
        await loc.waitFor({state: "visible", timeout: Timeout.EXTRA_EXTENSIVE});
        const isVisibleHead = await loc.isVisible({timeout});
        this.logger.debug('Head title visibility: ' + isVisibleHead);
        return isVisibleHead;
    }

}

export default HomePage;