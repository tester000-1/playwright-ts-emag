import { Timeout } from "../utils/Timeout";

abstract class BasePage {

    async acceptCookies(page){
        await page.getByRole('button', { name: 'Приеми всички' }).click({ timeout: Timeout.MIDDLE });
        await page.getByRole('button', { name: '' }).nth(1).click({ timeout: Timeout.MIDDLE });
        await page.getByRole('button', { name: '' }).first().click({ timeout: Timeout.MIDDLE });
    }

    getTextElement(page, text){
        return page.getByText(text);
    }

    getH1WithText(page, text){
        return page.locator('//h1[text()="Мобилни телефони"]');
    }

}

export default BasePage;