import CardViewFragment from './CardViewFragment';

class CardView {

    getCardViewFragment(page, index, logger){
        return new CardViewFragment(page, index, logger);
    }

    async getCardsCount(page){
        return await (await page.locator('//h2[@class="card-v2-title-wrapper"]').all()).length;
    }

    getAllCardViewInMainContainer(page){
        return page.locator('//div[@id="card_grid"]');
    }

    getAllCardViewTitles(page){
        return page.locator('//h2[@class="card-v2-title-wrapper"]').all();
    }

    getAllCardViewPrices(page){
        return page.locator('//p[@class="product-new-price"]').all();
    }

}

export default CardView;