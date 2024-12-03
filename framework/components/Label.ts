import BaseElement from "../BaseElement";
import Logger from "../Logger";


class Label extends BaseElement {

    constructor(name: string, locator: any, logger: Logger){
        super(name, locator, logger);
    }
    

}

export default Label;