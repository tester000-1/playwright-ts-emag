import BaseElement from "../BaseElement";
import Logger from "../Logger";


class Checkbox extends BaseElement {

    constructor(name: string, locator: any, logger: Logger){
        super(name, locator, logger);
    }

    async isChecked() {
        this.logger.debug(`Check if the element: ${this.name} is checked`);
        const isChecked = await this.locator.isChecked();
        this.logger.debug(`Locator: ${this.name} is checked: ${isChecked}`);
        return await isChecked;
    }

    async check(){
        this.logger.debug(`Check checkbox element: ${this.name}`);
        await this.locator.check();
        this.logger.debug(`Checkbox element: ${this.name} is checked`);
    }
    

}

export default Checkbox;