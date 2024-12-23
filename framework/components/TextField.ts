import BaseElement from "../BaseElement";
import Logger from "../Logger";



class TextBox extends BaseElement {

    constructor(name: string, locator: any, logger: Logger) {
        super(name, locator, logger);
    }

    async type(text: string){
        this.logger.debug(`Type in a text field: ${this.name}`);
        await this.locator.type(text);
        this.logger.debug(`Text field: ${this.name} with text: ${text}`);
    }

    async getText(){
        this.logger.debug(`Type in a text field: ${this.name}`);
        const text = await this.locator.inputValue();
        this.logger.debug(`Text field: ${this.name} with text: ${text}`);
        return await text;
    }

    async clearText(){
        this.logger.debug(`Clear text field with locator: ${this.name}`);
        await this.locator.clear();
    }

}

export default TextBox;