import BaseElement from "../BaseElement";
import Logger from "../Logger";


class Dropdown extends BaseElement {

    private selectOption: any;

    constructor(name: string, locator: any, logger: Logger, selectOption: any) {
        super(name, locator, logger);
        this.selectOption = selectOption;
    }

    dropdownIsVisible(): boolean {
        this.logger.info('Check if dropdown is visible');
        return this.locator.isVisible();
    }

    selectIsVisible(): boolean {
        this.logger.info('Check if select option is visible');
        return this.selectOption.isVisible();
    }


}

export default Dropdown;