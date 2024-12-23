import Logger from "./Logger";
import {Timeout} from "../utils/Timeout";
import logger from "./Logger";


abstract class BaseElement {

    protected name: string;
    protected locator: any;
    protected logger: Logger;

    constructor(name: string, locator: any, logger: Logger) {
        this.name = name;
        this.locator = locator;
        this.logger = logger;
    }

    async setLocator(locator){
        this.logger.debug(`Set a new locator: ${locator}`);
        this.locator = locator;
    }

    async setName(name){
        this.logger.debug(`Set a new locator's name. Old name: ${this.name}, New name: ${name}`);
        this.name = name;
    }

    async getLocator(){
        this.logger.debug(`Return ${this.name} with locator: ${this.locator}`);
        return await this.locator;
    }

    async getName(){
        this.logger.debug(`Get locator's name: ${this.name}`);
        return this.name;
    }

    async waitUntilVisible() {
        this.logger.debug(`Wait until ${this.name} is visible`);
        const isElementVisible = this.locator.waitFor('visible');
        this.logger.debug(`Element with name: ${this.name} is visible: ${isElementVisible}`);
        return isElementVisible;
    }

    async isEnabled() {
        this.logger.debug(`Check if the ${this.name} is enabled`);
        const isLocEnabled = await this.locator.isEnabled();
        this.logger.debug(`Locator with name: ${this.name} is enabled: ${isLocEnabled}`);
        return await isLocEnabled;
    }

    async isVisible(timeout?) {
        this.logger.debug(`Check if the ${this.name} is visible`);
        await this.locator.waitFor({state: "visible", timeout: Timeout.EXTRA_EXTENSIVE});
        const isLocVisible = await this.locator.isVisible(timeout);
        this.logger.debug(`Locator with name: ${this.name} is visible: ${isLocVisible}`);
        return await isLocVisible;
    }

    async waitUntilAttachedToDOM(timeout?: number){
        this.logger.debug(`Check if the ${this.name} is attached`);
        await this.locator.waitFor({state: "attached", timeout: Timeout.EXTRA_EXTENSIVE});
        const isAttacked = await this.locator.isVisible(timeout);
        this.logger.debug(`Locator with name: ${this.name} is attached: ${isAttacked}`);
    }

    async click(timeout?){
        this.logger.debug(`Click ${this.name} with locator: ${this.locator}`);
        await this.locator.click(timeout);
    }

    async isDisabled(){
        this.logger.debug(`Check if ${this.name} with locator: ${this.locator} is disabled`);
        const isDisabled = await this.locator.isDisabled();
        this.logger.debug(`Locator with name: ${this.name} with locator: ${this.locator} is disabled: ${isDisabled}`);
        return await isDisabled;
    }

    async isEditable(){
        this.logger.debug(`Check if ${this.name} with locator: ${this.locator} is editable`);
        const isEditable = await this.locator.isEditable();
        this.logger.debug(`Locator with name: ${this.name} with locator: ${this.locator} is editable: ${isEditable}`);
        return await isEditable;
    }

    async isHidden(){
        this.logger.debug(`Check if ${this.name} with locator: ${this.locator} is hidden`);
        const isHidden = await this.locator.isHidden();
        this.logger.debug(`Locator with name: ${this.name} with locator: ${this.locator} is hidden: ${isHidden}`);
        return await isHidden;
    }

}

export default BaseElement;