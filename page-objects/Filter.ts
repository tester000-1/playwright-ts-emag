import Link from "../framework/components/Link";
import Logger from "../framework/Logger";
import {Page} from "@playwright/test";
import {Timeout} from "../utils/Timeout";
import Label from "../framework/components/Label";
import CustomDropdown from "./CustomDropdown";
import Button from "../framework/components/Button";


class Filter {
    private readonly logger: Logger;
    private page: Page;
    private brandSearchFilter: Link;
    private brandName: Link;

    constructor(logger: any, page: Page) {
        this.page = page;
        this.logger = logger;
        this.brandSearchFilter = new Link('Link: виж повече', this.page.getByRole('link', {name: 'виж повече'}).nth(1), this.logger);
        this.brandName = new Link('Link for brand name', null, this.logger);
    }

    async expandBrandSearchFilter(timeout?) {
        await this.brandSearchFilter.waitUntilAttachedToDOM();
        const isVisible = this.brandSearchFilter.isVisible();
        if (!isVisible) {
            this.logger.error("Filter 'виж повече' is not visible!");
        }
        await this.brandSearchFilter.click(timeout);
    }

    async getBrandNameAsLink(brandName: string) {
        const link = new Link('Link: brand name ' + brandName,
            this.page.getByRole('link', {name: brandName}).nth(1),
            this.logger);
        await this.brandName.setName('Link: brand name ' + brandName);
        await this.brandName.setLocator(link.getLocator());
        return await this.brandName.getLocator();
    }

    async isVisibleBrandById(id, timeout?) {
        const brand = new Link(`Brand ID: ${id}`,
            this.page.locator('//a[@data-option-id="' + id + '"]').nth(1),
            this.logger);
        return await brand.isVisible(timeout);
    }

    async clickBrandByTestId(id: any, timeout?: number) {
        const button = new Link(`Brand button: ${await this.brandName.getName()}`,
            this.page.locator('//a[@data-option-id="' + id + '"]').nth(1),
            this.logger);
        await button.isVisible(Timeout.HUGE);
        await button.click(Timeout.SMALL);
    }

    async isVisibleFilter(timeout?: number) {
        const filterBtn = new Button("Filter button",
            this.page.locator('//div[@class="filter-footer"]//button[1]'),
            this.logger);
        return await filterBtn.isVisible({timeout});
    }

    async clickFilter(timeout?) {
        const filterBtn = new Link('Filter button',
            this.page.locator('//div[@class="filter-footer"]//button[1]'),
            this.logger);
        await filterBtn.isVisible(timeout);
        await filterBtn.click(timeout);
    }

    async isVisibleDropdownSortingButton(timeout?: number) {
        const dropdown = new CustomDropdown("Dropdown: sort product by 'Най-популярни'",
            this.page.locator('(//span[text()="Най-популярни"])[1]'),
            this.logger);
        return await dropdown.isVisible({timeout});
    }

    async clickDropdownSortingButton(timeout?) {
        const locator = new Label('dropdown "Най-популярни"',
            this.page.locator('(//span[text()="Най-популярни"])[1]'),
            this.logger);
        await locator.click(timeout);
    }

    async isVisibleFromLowToHigh(timeout?: number) {
        const select = new Label("Dropdown: Цена възх.",
            this.page.locator('(//a[text()="Цена възх."])[1]'),
            this.logger);
        return await select.isVisible({timeout});
    }

    async clickFromLowToHigh(timeout?) {
        const link = new Link("Dropdown 'Цена възх'",
            this.page.getByRole('link', {name: 'Цена възх.'}).first(),
            this.logger);
        await link.click(timeout);
    }

}

export default Filter;