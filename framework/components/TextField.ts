import BaseElement from "../BaseElement";
import {Logger} from "log4js";


class TextBox extends BaseElement {

    private text: string;

    constructor(name: string, locator: any, logger: Logger, text: string) {
        super(name, locator, logger);
        this.text = text;
    }

}

export default TextBox;