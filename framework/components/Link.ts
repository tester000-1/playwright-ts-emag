import BaseElement from "../BaseElement";
import { expect } from '@playwright/test';
import Logger from "../Logger";
import logger from "../Logger";
import {Timeout} from "../../utils/Timeout";


class Link extends BaseElement {

    constructor(name: string, locator: any, logger: Logger){
        super(name, locator, logger);
    }

}

export default Link;