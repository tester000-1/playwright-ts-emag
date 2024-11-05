class Pagination {

    getPageNumerLink(page, number){
        return page.getByRole('link', { name: number, exact: true });
    }

    getActivePageNumer(page, number){
        return page.locator('//li[@class="active"]//a[text()="' + number + '"]');
    }

}

export default Pagination;