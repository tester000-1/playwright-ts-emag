import {Timeout} from "../utils/Timeout";

class Filter {

    expandBrandSearchFilter(page){
        return page.getByRole('link', { name: 'виж повече' }).nth(1);
    }

    getBrandNameAsLink(page, brandName: string){
        return page.getByRole('link', { name: brandName }).nth(1);
    }

    getBrandByTestId(page, id){
        return page.locator('//a[@data-option-id="' + id + '"]').nth(1);
    }

    getButtonFilter(page){
        return page.locator('//div[@class="filter-footer"]//button[1]');
    }

    getDropdownSortingButton(page){
        return page.locator('(//span[text()="Най-популярни"])[1]');
    }

    getDropdowsSelectFromLowToHigh(page){
        return page.locator('(//a[text()="Цена възх."])[1]');
    }

    getDropdownSelectFromLowToHighLink(page){
        return page.getByRole('link', { name: 'Цена възх.' });
    }

}

export default Filter;