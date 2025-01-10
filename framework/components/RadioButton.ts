import BaseElement from "../BaseElement";
import Logger from "../Logger";
import {Locator} from "@playwright/test";


class RadioButton extends BaseElement {

    constructor(name: string, locator: Locator, logger: Logger){
        super(name, locator, logger);
    }

    async isChecked() {
        this.logger.debug(`Check if RadioButton: ${this.name} is Checked`);
        const isChecked = await this.locator.isChecked();
        this.logger.debug(`Check if RadioButton: ${this.name} is Checked: ${isChecked}`);
        return isChecked;
    }

}

export default RadioButton;