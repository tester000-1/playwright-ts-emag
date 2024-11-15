import {Logger} from "log4js";

abstract class BaseElement {

    protected name: string;
    protected locator: any;
    protected logger: Logger;

    constructor(name: string, locator: any, logger: Logger) {
        this.name = name;
        this.locator = locator;
        this.logger = logger;
    }

    waitUntilVisible(): boolean {
        this.logger.info('Check if the locator is valid');
        //return this.locator.waitFor('visible');
        return this.locator.check();
    }

    isEnabled(): boolean {
        this.logger.info('Check if the locator is enabled');
        return this.locator.isEnabled();
    }

    isVisible(): boolean {
        this.logger.info('Check if the locator is visible');
        return this.locator.isVisible();
    }

    getLocator(){
        this.logger.debug('Return button with locator: ' + this.locator);
        return this.locator;
    }

}

export default BaseElement;