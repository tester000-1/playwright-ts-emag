import BaseElement from "../BaseElement";
import {expect, Locator} from '@playwright/test';
import Logger from "../Logger";
import logger from "../Logger";
import {Timeout} from "../../utils/Timeout";


class Link extends BaseElement {

    constructor(name: string, locator: Locator, logger: Logger){
        super(name, locator, logger);
    }

}

export default Link;