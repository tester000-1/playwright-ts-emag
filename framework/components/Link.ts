import BaseElement from "../BaseElement";
import { expect } from '@playwright/test';
import Logger from "../Logger";


class Link extends BaseElement {

    constructor(name: string, locator: any, logger: Logger){
        super(name, locator, logger);
    }

    getLink(){
        return this.locator;
    }

    linkIsVisible(): boolean {
        this.logger.info('Check if the link is visible');
        return this.locator.isVisible();
    }
    

}

export default Link;