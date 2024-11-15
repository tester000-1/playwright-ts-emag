import BaseElement from "../BaseElement";
import {Logger} from "log4js";

class RadioButton extends BaseElement {

    constructor(name: string, locator: any, logger: Logger){
        super(name, locator, logger);
    }

    isEnabled(): boolean{
        this.logger.info('Check if RadioButton is Enabled');
        return this.locator.isEnabled();
    }

    isChecked(): boolean {
        this.logger.info('Check if RadioButton is Checked');
        return this.locator.isChecked();
    }
    

}

export default RadioButton;