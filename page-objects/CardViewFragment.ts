import { Page } from "@playwright/test";

class CardViewFragment {

    private index: number | undefined;
    private page: Page | undefined;

    constructor(page: Page, index: number) {
        this.index = index;
        this.page = page;
    }

    getCardViewTitleByIndex() {
        return this.page!.locator(`(//div[@id="card_grid"]//h2[@class="card-v2-title-wrapper"])[${this.index}]`).innerText();
    }

    getCardViewPriceByIndex() {
        return this.page!.locator(`(//div[@id="card_grid"]//p[@class="product-new-price"])[${this.index}]`).innerText();
    }

}

export default CardViewFragment;

