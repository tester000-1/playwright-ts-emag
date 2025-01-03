import CardViewFragment from './CardViewFragment';
import {Page} from "@playwright/test";
import Logger from "../framework/Logger";


class CardView {

    constructor() {

    }

    getCardViewFragment(page: Page, index: number, logger: Logger){
        return new CardViewFragment(page, index, logger);
    }

    async getCardsCount(page: Page): Promise<number>{
        return (await page.locator('//div[@id="card_grid"]//h2[@class="card-v2-title-wrapper"]').all()).length;
    }

    async getAllCardViewInMainContainer(page: Page){
        return page.locator('//div[@id="card_grid"]');
    }

    async getAllCardViewTitles(page: Page){
        return await page.locator('//div[@id="card_grid"]//h2[@class="card-v2-title-wrapper"]').all();
    }

    async getAllCardViewPrices(page: Page){
        return await page.locator('//div[@id="card_grid"]//p[@class="product-new-price"]').all();
    }

    async getFirstCardViewTitle(page: Page){
        return await page.locator('//div[@id="card_grid"]//h2[@class="card-v2-title-wrapper"]')
            .first()
            .innerText();
    }

}

export default CardView;