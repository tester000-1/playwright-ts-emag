import Logger from "./Logger";


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
        this.logger.debug('Check if the locator is valid');
        return this.locator.waitFor('visible');
    }

    isEnabled(): boolean {
        this.logger.debug('Check if the locator is enabled');
        return this.locator.isEnabled();
    }

    isVisible(): boolean {
        this.logger.debug('Check if the locator is visible');
        return this.locator.isVisible();
    }

    getLocator(){
        this.logger.debug('Return button with locator: ' + this.locator);
        return this.locator;
    }

    click(){
        this.logger.debug('Click button with locator: ' + this.locator);
        this.locator.click();
    }

    isClosed(){
        return this.locator.isClosed();
    }

    isDeleted(){
        return this.locator.isDeleted();
    }

    isDisabled(){
        return this.locator.isDisabled();
    }

    isEditable(){
        return this.locator.isEditable();
    }

    isHidden(){
        return this.locator.isHidden();
    }

    isDetached(){
        return this.locator.isDetached();
    }

}

export default BaseElement;