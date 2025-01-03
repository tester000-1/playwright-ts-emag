import BaseElement from "../BaseElement";
import Logger from "../Logger";
import {Locator} from "@playwright/test";


class Label extends BaseElement {

    constructor(name: string, locator: Locator, logger: Logger){
        super(name, locator, logger);
    }

}

export default Label;