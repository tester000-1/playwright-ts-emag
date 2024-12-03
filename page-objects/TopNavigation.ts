import Logger from "../framework/Logger";


class TopNavigation {

    private logger: Logger;

    constructor(logger: any) {
        this.logger = logger;
    }

    getLinkLocator(page, title){
        this.logger.info('Get locator by link: ' + title)
        return page.getByRole('link', { name: title });
    }

    getLinkLocatorExactName(page, title, exactName: boolean){
        this.logger.info('Get locator by link and exact name: ' + title)
        return page.getByRole('link', { name: title, exact: exactName });
    }

}

export default TopNavigation;