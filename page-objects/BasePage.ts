import Button from "../framework/components/Button";
import {Page} from "@playwright/test";
import Logger from "../framework/Logger";


abstract class BasePage {

    protected logger: Logger;
    protected page: Page;
    protected btnAcceptCookies: Button;
    protected btnCloseEnterInYourAccount: Button;
    protected btnCloseBanner: Button;

    constructor(logger: Logger, page: Page) {
        this.page = page;
        this.logger = logger;
        this.btnAcceptCookies = new Button('Button "Приеми всички"', this.page.getByRole('button', { name: 'Приеми всички' }), this.logger);
        this.btnCloseEnterInYourAccount = new Button('Button "close your account"', this.page.getByRole('button', {name: ''}).nth(1), this.logger);
        this.btnCloseBanner = new Button('Button "close banner"', this.page.getByRole('button', { name: '' }).first(), this.logger);
    }

    async acceptCookies(){
        await this.btnAcceptCookies.click();
    }

    async closeEnterInYourAccount(){
        await this.btnCloseEnterInYourAccount.click();
    }

    async closeBanner(){
        await this.btnCloseBanner.click();
    }

    async getTextElement(text: string){
        return this.page.getByText(text);
    }

    async getProductHeader(text: string){
        return this.page.locator(`//h1[text()="${text}"]`);
    }

}

export default BasePage;