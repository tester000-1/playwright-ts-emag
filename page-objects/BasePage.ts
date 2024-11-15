
import Button from "../framework/components/Button";

abstract class BasePage {

    protected logger: any;

    constructor(logger: any) {
        this.logger = logger;
    }

    acceptCookies(page){
        const button = new Button('Create button "Приеми всички"', page.getByRole('button', { name: 'Приеми всички' }), this.logger);
        return button.getLocator();
    }

    btnEnterInYourAccount(page){
        const button = new Button('Create button "close your account"', page.getByRole('button', { name: '' }).nth(1), this.logger);
        return button.getLocator();
    }

    btnCloseBanner(page){
        const button = new Button('Create button "close banner"', page.getByRole('button', { name: '' }).first(), this.logger);
        return button.getLocator();
    }

    getTextElement(page, text){
        return page.getByText(text);
    }

    getH1WithText(page, text: string){
        return page.locator(`//h1[text()="${text}"]`);
    }

}

export default BasePage;