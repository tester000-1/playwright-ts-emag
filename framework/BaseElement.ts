import Logger from "./Logger";
import {Timeout} from "../utils/Timeout";
import {Locator} from "@playwright/test";


abstract class BaseElement {

    protected name: string;
    protected locator: Locator;
    protected logger: Logger;

    constructor(name: string, locator: Locator, logger: Logger) {
        this.name = name;
        this.locator = locator;
        this.logger = logger;
    }

    async setLocator(locator: Locator){
        this.logger.debug(`Set a new locator: ${locator}`);
        this.locator = locator;
    }

    async setName(name: string){
        this.logger.debug(`Set a new locator's name. Old name: ${this.name}, New name: ${name}`);
        this.name = name;
    }

    async getLocator(){
        this.logger.debug(`Return ${this.name} with locator: ${this.locator}`);
        return this.locator;
    }

    async getName(){
        this.logger.debug(`Get locator's name: ${this.name}`);
        return this.name;
    }

    async waitUntilVisible(timeout?: number) {
        this.logger.debug(`Wait until ${this.name} is visible`);
        const isElementVisible = this.locator.waitFor({state: 'visible', timeout: timeout});
        this.logger.debug(`Element with name: ${this.name} is visible: ${isElementVisible}`);
        return isElementVisible;
    }

    async isEnabled(timeout?: Timeout) {
        this.logger.debug(`Check if the ${this.name} is enabled`);
        const isLocEnabled = await this.locator.isEnabled({timeout});
        this.logger.debug(`Locator with name: ${this.name} is enabled: ${isLocEnabled}`);
        return isLocEnabled;
    }

    async isVisible(timeout: Timeout = Timeout.DEFAULT) {
        this.logger.debug(`Check if the ${this.name} is visible`);
        await this.waitUntilVisible(timeout);
        const isLocVisible = await this.locator.isVisible();
        this.logger.debug(`Locator with name: ${this.name} is visible: ${isLocVisible}`);
        return isLocVisible;
    }

    async waitUntilAttachedToDOM(timeout?: Timeout){
        this.logger.debug(`Check if the ${this.name} is attached`);
        await this.locator.waitFor({state: "attached", timeout: Timeout.EXTRA_EXTENSIVE});
        const isAttacked = await this.locator.isVisible({timeout});
        this.logger.debug(`Locator with name: ${this.name} is attached: ${isAttacked}`);
    }

    async click(options?: Object){
        this.logger.debug(`Click ${this.name} with locator: ${this.locator}`);
        await this.locator.click(options);
    }

    async isDisabled(timeout?: Timeout){
        this.logger.debug(`Check if ${this.name} with locator: ${this.locator} is disabled`);
        const isDisabled = await this.locator.isDisabled({timeout});
        this.logger.debug(`Locator with name: ${this.name} with locator: ${this.locator} is disabled: ${isDisabled}`);
        return isDisabled;
    }

    async isEditable(timeout?: Timeout){
        this.logger.debug(`Check if ${this.name} with locator: ${this.locator} is editable`);
        const isEditable = await this.locator.isEditable({timeout});
        this.logger.debug(`Locator with name: ${this.name} with locator: ${this.locator} is editable: ${isEditable}`);
        return isEditable;
    }

    async isHidden(timeout?: Timeout){
        this.logger.debug(`Check if ${this.name} with locator: ${this.locator} is hidden`);
        const isHidden = await this.locator.isHidden({timeout});
        this.logger.debug(`Locator with name: ${this.name} with locator: ${this.locator} is hidden: ${isHidden}`);
        return isHidden;
    }

}

export default BaseElement;