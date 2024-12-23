import BasePage from "./BasePage";
import Link from "../framework/components/Link";
import Button from "../framework/components/Button";
import {Page} from "@playwright/test";
import Logger from "../framework/Logger";


class SocialMediaPage extends BasePage {

    private facebookLink: Link;
    private youtubeLink: Link;
    private instagramLink: Link;
    private acceptCookiesYoutube: Button;
    private acceptCookiesInstagram: Button;
    private closeCookiesInstagram: Button;

    constructor(logger: Logger, page: Page) {
        super(logger, page);
        this.facebookLink = new Link('create FB link', this.page.getByRole('link', {name: ''}), this.logger);
        this.youtubeLink = new Link('create Youtube link', this.page.getByRole('link', {name: ''}), this.logger);
        this.instagramLink = new Link('create Instagram link', this.page.getByRole('link', {name: ''}), this.logger);
        this.acceptCookiesYoutube = new Button('create locator Accept Cookies Youtube', page.getByRole('button', {name: 'Accept all'}), this.logger);
        this.acceptCookiesInstagram = new Button('create locator Accept All Cookies Instagram', page.getByRole('button', {name: 'Allow all cookies'}), this.logger);
        this.closeCookiesInstagram = new Button('create locator Accept Cookies Close btn Instagram', page.getByRole('button', {name: 'Close'}), this.logger);
    }

    async setPage(page: Page){
        this.page = page;
    }

    async clickFacebookLink() {
        this.logger.debug('click FB link');
        await this.facebookLink.click();
    }

    async clickYoutubeLink() {
        this.logger.debug('click Youtube link');
        await this.youtubeLink.click();
    }

    async clickInstagramLink(page, timeout?) {
        this.logger.debug('click Instagram link');
        await this.setPage(page);
        await this.instagramLink.click(timeout);
    }

    async acceptCookiesYouTube(page: Page, timeout?) {
        await this.setPage(page);
        await this.acceptCookiesYoutube.setLocator(page.getByRole('button', {name: 'Accept all'}))
        await this.acceptCookiesYoutube.click(timeout);
    }

    async acceptAllCookiesInstagram(page: Page, timeout?) {
        await this.acceptCookiesInstagram.setLocator(page.getByRole('button', {name: 'Allow all cookies'}))
        await this.acceptCookiesInstagram.click(timeout);
    }

    async acceptCookiesCloseBtnInstagram(page, timeout?) {
        await this.closeCookiesInstagram.setLocator(page.getByRole('button', {name: 'Close'}))
        await this.closeCookiesInstagram.click(timeout);
    }

}

export default SocialMediaPage;