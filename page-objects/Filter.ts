
import Link from "../framework/components/Link";
import Logger from "../framework/Logger";


class Filter {
    private readonly logger: Logger;
    constructor(logger: any) {
        this.logger = logger;
    }

    expandBrandSearchFilter(page){
        const link = new Link('Link: виж повече', page.getByRole('link', { name: 'виж повече' }).nth(1), this.logger);
        return link.getLink();
        //return page.getByRole('link', { name: 'виж повече' }).nth(1);
    }

    getBrandNameAsLink(page, brandName: string){
        this.logger.info('Get the link of the Brand name: ' + brandName);
        const link = new Link('Link: brand name ' + brandName, page.getByRole('link', { name: brandName }).nth(1), this.logger);
        return link.getLink();
    }

    getBrandByTestId(page, id){
        this.logger.info('Get brand by data-option-id: ' + id);
        return page.locator('//a[@data-option-id="' + id + '"]').nth(1);
    }

    getButtonFilter(page){
        this.logger.info('Get filter button' );
        return page.locator('//div[@class="filter-footer"]//button[1]');
    }

    getDropdownSortingButton(page){
        this.logger.info('Get sorting dropdown "Най-популярни"' );
        return page.locator('(//span[text()="Най-популярни"])[1]');
    }

    getDropdownSelectFromLowToHigh(page){
        this.logger.info('Get sorting dropdown "Цена възх."' );
        return page.locator('(//a[text()="Цена възх."])[1]');
    }

    getDropdownSelectFromLowToHighLink(page){
        this.logger.info('Get sorting dropdown "Цена възх." as link' );
        return page.getByRole('link', { name: 'Цена възх.' });
    }

}

export default Filter;