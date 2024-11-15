import BasePage from "./BasePage";
import logger from "../framework/Logger";

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