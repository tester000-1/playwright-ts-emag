import BaseElement from "../framework/BaseElement";
import Logger from "../framework/Logger";
import {Locator} from "@playwright/test";


class CustomDropdown extends BaseElement {

    private selectOption: any;

    constructor(name: string, locator: Locator, logger: Logger, selectOption?: any) {
        super(name, locator, logger);
        this.selectOption = selectOption;
    }

    async dropdownIsVisible() {
        this.logger.debug(`Check if dropdown: ${this.name} is visible`);
        const isDropdownVisible = await this.locator.isVisible();
        this.logger.debug(`The dropdown: ${this.name} is visible: ${isDropdownVisible}`);
        return isDropdownVisible;
    }

    async selectIsVisible() {
        this.logger.debug(`Check if select option: ${this.name} is visible`);
        const selectIsVisible = await this.selectOption.isVisible();
        this.logger.debug(`Select option: ${this.name}  is visible: ${selectIsVisible}`);
        return await selectIsVisible;
    }


}

export default CustomDropdown;