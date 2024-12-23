import BasePage from "./BasePage";
import {Page} from "@playwright/test";
import {Timeout} from "../utils/Timeout";

class HomePage extends BasePage{

    constructor(logger: any, page: Page) {
        super(logger, page);
    }

    async getHeadingName(title, timeout?){
        this.logger.debug('Return element with title ' + title);
        const loc = this.page.getByRole('heading', { name: title });
        await loc.waitFor({state: "visible", timeout: Timeout.EXTRA_EXTENSIVE});
        const isVisibleHead = await loc.isVisible(timeout);
        this.logger.debug('Head title visibility: ' + isVisibleHead);
        return isVisibleHead;
    }

}

export default HomePage;