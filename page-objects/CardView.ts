import CardViewFragment from './CardViewFragment';

class CardView {

    getCardViewFragment(page, index){
        return new CardViewFragment(page, index);
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