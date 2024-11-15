import { Page } from "@playwright/test";
import {Logger} from "log4js";

class CardViewFragment {

    private index: number | undefined;
    private page: Page | undefined;
    private logger: Logger | undefined;

    constructor(page: Page, index: number, logger: any) {
        this.index = index;
        this.page = page;
        this.logger = logger;
    }

    getCardViewTitleByIndex() {
        this.logger.debug(`Get card view title by Index: (//div[@id="card_grid"]//h2[@class="card-v2-title-wrapper"])[${this.index}]`);
        return this.page!.locator(`(//div[@id="card_grid"]//h2[@class="card-v2-title-wrapper"])[${this.index}]`).innerText();
    }

    getCardViewPriceByIndex() {
        this.logger.debug(`Get card view price by Index: (//div[@id="card_grid"]//p[@class="product-new-price"])[${this.index}]`);
        return this.page!.locator(`(//div[@id="card_grid"]//p[@class="product-new-price"])[${this.index}]`).innerText();
    }

}

export default CardViewFragment;

