import CardViewFragment from './CardViewFragment';
import {Logger} from "log4js";

class CardView {

    private logger: Logger;

    constructor(logger: any) {
        this.logger = logger;
    }

    getCardViewFragment(page, index){
        this.logger.debug('Create card view fragment with id: ' + index);
        return new CardViewFragment(page, index, this.logger);
    }

    async getCardsCount(page){
        return await (page.locator('//h2[@class="card-v2-title-wrapper"]').all()).length;
    }

    getAllCardViewInMainContainer(page){
        this.logger.info('Get all cards');
        return page.locator('//div[@id="card_grid"]');
    }

    getAllCardViewTitles(page){
        this.logger.info('Get all card titles');
        return page.locator('//h2[@class="card-v2-title-wrapper"]').all();
    }

    getAllCardViewPrices(page){
        this.logger.info('Get all card price locators');
        return page.locator('//p[@class="product-new-price"]').all();
    }

}

export default CardView;