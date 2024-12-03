import BaseElement from "../BaseElement";
import Logger from "../Logger";


class Checkbox extends BaseElement {

    constructor(name: string, locator: any, logger: Logger){
        super(name, locator, logger);
    }

    isChecked(): boolean {
        this.logger.info('Check if the button is checked');
        return this.locator.isChecked();
    }
    

}

export default Checkbox;