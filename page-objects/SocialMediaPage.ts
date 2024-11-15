import BasePage from "./BasePage";
import Link from "../framework/components/Link";
import Button from "../framework/components/Button";


class SocialMediaPage extends BasePage {

    constructor(logger: any) {
        super(logger);
    }

    getFacebookLink(page) {
        this.logger.info('return FB link');
        const link = new Link('create FB link', page.getByRole('link', {name: ''}), this.logger);
        return link.getLink();
    }

    getYoutubeLink(page) {
        this.logger.info('return Youtube link');
        const link = new Link('create Youtube link', page.getByRole('link', {name: ''}), this.logger);
        return link.getLink();
    }

    getInstagramLink(page) {
        this.logger.info('return Instagram link');
        const link = new Link('create Instagram link', page.getByRole('link', {name: ''}), this.logger);
        return link.getLink();
    }

    getAcceptCookiesYouTube(page) {
        this.logger.info('return locator Accept Cookies Youtube');
        const button = new Button('create locator Accept Cookies Youtube', page.getByRole('button', {name: 'Accept all'}), this.logger);
        return button.getLocator();
    }

    acceptAllCookiesInstagram(page) {
        this.logger.info('return locator Accept All Cookies Instagram');
        const button = new Button('create locator Accept All Cookies Instagram', page.getByRole('button', {name: 'Allow all cookies'}), this.logger);
        return button.getLocator();
    }

    acceptCookiesCloseBtnInstagram(page) {
        this.logger.info('return locator Accept Cookies Close btn Instagram');
        const button = new Button('create locator Accept Cookies Close btn Instagram', page.getByRole('button', {name: 'Close'}), this.logger);
        return button.getLocator();
    }


}

export default SocialMediaPage;