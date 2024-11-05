require('dotenv').config();

export class Browser {

    async visitBaseUrl(page) {
        await page.goto(process.env.BASE_URL);
    }

    async openPageView(page, path) {
        await page.goto(process.env.BASE_URL + path);
    }

    async openLinkFacebook(page) {
        await page.goto(process.env.FACEBOOK);
    }

    async scrollTop(page) {
        await page.evaluate(() => window.scroll(0, 0));
    }

    async scrollUntilVisible(page, selector) {
        await page.evaluate(() => window.scroll(0, 1800));
    }

}
export default Browser;