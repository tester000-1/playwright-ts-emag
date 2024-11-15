import { expect } from '@playwright/test';
import BaseElement from "../BaseElement";
import { Timeout } from "../../utils/Timeout";
import {Logger} from "log4js";

class Button extends BaseElement {

    constructor(name: string, locator: any, logger: Logger){
        super(name, locator, logger);
    }
    
}

export default Button;