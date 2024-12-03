import BasePage from "./BasePage";

class HomePage extends BasePage{

    constructor(logger: any) {
        super(logger);
    }

    getHeadingName(page, title){
        this.logger.info('Return element with title ' + title)
        return page.getByRole('heading', { name: title });
    }

}

export default HomePage;