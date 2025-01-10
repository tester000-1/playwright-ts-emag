import BaseElement from "../BaseElement";
import Logger from "../Logger";
import {Locator} from "@playwright/test";

class Dropdown extends BaseElement {

    constructor(name: string, locator: Locator, logger: Logger){
        super(name, locator, logger);
    }

    async selectOption(option: string | string[]){
        this.logger.debug(`Select dropdown option: ${option.toString()}`);
        await this.locator.selectOption(option);
    }

    async selectOptionByLabel(option: string) {
        this.logger.debug(`Select dropdown option by label: ${option}`);
        await this.locator.selectOption({ label: option });
    }

}

export default Dropdown;