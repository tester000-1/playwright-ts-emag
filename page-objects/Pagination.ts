import Logger from "../framework/Logger";

class Pagination {

    private logger: Logger;

    constructor(logger: any) {
        this.logger = logger;
    }

    getPageNumerLink(page, number){
        this.logger.info('return page number link: ' + number)
        return page.getByRole('link', { name: number, exact: true });
    }

    getActivePageNumer(page, number){
        this.logger.info('Get active page number link: ' + number)
        return page.locator('//li[@class="active"]//a[text()="' + number + '"]');
    }

}

export default Pagination;