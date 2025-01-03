import {Page} from "@playwright/test";
import {Timeout} from "../utils/Timeout";
import Logger from "../framework/Logger";

class CardViewFragment {

    private index: number | undefined;
    private page: Page | undefined;
    private logger: Logger | undefined;

    constructor(page: Page, index: number, logger: Logger) {
        this.index = index;
        this.page = page;
        this.logger = logger;
    }

    async getProductTitle() {
        this.logger.debug(`Get card view title by Index: (//div[@id="card_grid"]//h2[@class="card-v2-title-wrapper"])[${this.index}]`);
        return await this.page!.locator(`(//div[@id="card_grid"]//h2[@class="card-v2-title-wrapper"])[${this.index}]`).innerText();
    }

    async getFinalPrice() {
        this.logger.debug(`Get card view price by Index: (//div[@id="card_grid"]//p[@class="product-new-price"])[${this.index}]`);
        return await this.page!.locator(`(//div[@id="card_grid"]//p[@class="product-new-price"])[${this.index}]`).innerText();
    }

    async getOldPrice() {
        this.logger.debug(`Get card view old price by Index: (//div[@id="card_grid"]//p[@class[contains(., "pricing")]])[${this.index}]`);
        const loc = this.page!.locator(`(//div[@id="card_grid"]//p[@class[contains(., "pricing")]])[${this.index}]`);

        const isVisible = await loc.isVisible({timeout: Timeout.SMALL});
        if(!isVisible){
            return "none";
        }
        let text: any = await this.page.locator(`(//div[@id="card_grid"]//p[@class[contains(., "pricing")]])[${this.index}]`).innerText();
        if(text.includes("НОВО")){
            text = text.replace("НОВО", "");
        } else {
            text = "none";
        }
        return text;
    }

}

export default CardViewFragment;

