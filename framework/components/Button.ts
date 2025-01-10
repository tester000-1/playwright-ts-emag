import {expect, Locator} from '@playwright/test';
import BaseElement from "../BaseElement";
import { Timeout } from "../../utils/Timeout";
import Logger from "../Logger";


class Button extends BaseElement {

    constructor(name: string, locator: Locator, logger: Logger){
        super(name, locator, logger);
    }
    
}

export default Button;