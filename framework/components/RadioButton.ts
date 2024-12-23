import BaseElement from "../BaseElement";
import Logger from "../Logger";


class RadioButton extends BaseElement {

    constructor(name: string, locator: any, logger: Logger){
        super(name, locator, logger);
    }

    async isChecked() {
        this.logger.debug(`Check if RadioButton: ${this.name} is Checked`);
        const isChecked = await this.locator.isChecked();
        this.logger.debug(`Check if RadioButton: ${this.name} is Checked: ${isChecked}`);
        return await isChecked;
    }
    

}

export default RadioButton;