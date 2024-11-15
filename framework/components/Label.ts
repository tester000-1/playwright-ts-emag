import BaseElement from "../BaseElement";
import {Logger} from "log4js";

class Label extends BaseElement {

    constructor(name: string, locator: any, logger: Logger){
        super(name, locator, logger);
    }
    

}

export default Label;