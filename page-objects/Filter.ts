import Link from "../framework/components/Link";
import Logger from "../framework/Logger";
import {Page} from "@playwright/test";
import {Timeout} from "../utils/Timeout";
import Label from "../framework/components/Label";
import CustomDropdown from "./CustomDropdown";
import Button from "../framework/components/Button";
import {ProductTestID} from "../utils/ProductsTestID";


class Filter {
    private readonly logger: Logger;
    private page: Page;
    private brandSearchFilter: Link;
    private brandName: Link;

    constructor(logger: Logger, page: Page) {
        this.page = page;
        this.logger = logger;
        this.brandSearchFilter = new Link('Link: виж повече', this.page.getByRole('link', {name: 'виж повече'}).nth(1), this.logger);
        this.brandName = new Link('Link for brand name', null, this.logger);
    }

    async expandBrandSearchFilter(timeout?: Timeout) {
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
        await this.brandName.setLocator(await link.getLocator());
        return await this.brandName.getLocator();
    }

    async isVisibleBrandById(id: ProductTestID, timeout?: Timeout) {
        const brand = new Link(`Brand ID: ${id}`,
            this.page.locator('//a[@data-option-id="' + id + '"]').nth(1),
            this.logger);
        return await brand.isVisible(timeout);
    }

    async clickBrandByTestId(id: ProductTestID, timeout?: Timeout) {
        const button = new Link(`Brand button: ${await this.brandName.getName()}`,
            this.page.locator('//a[@data-option-id="' + id + '"]').nth(1),
            this.logger);
        await button.isVisible();
        await button.click(timeout);
    }

    async isVisibleFilter(timeout?: Timeout) {
        const filterBtn = new Button("Filter button",
            this.page.locator('//div[@class="filter-footer"]//button[1]'),
            this.logger);
        return await filterBtn.isVisible(timeout);
    }

    async clickFilter(timeout?: Timeout) {
        const filterBtn = new Link('Filter button',
            this.page.locator('//div[@class="filter-footer"]//button[1]'),
            this.logger);
        await filterBtn.isVisible(timeout);
        await filterBtn.click(timeout);
    }

    async isVisibleDropdownSortingButton(timeout?: Timeout) {
        const dropdown = new CustomDropdown("Dropdown: sort product by 'Най-популярни'",
            this.page.locator('(//span[text()="Най-популярни"])[1]'),
            this.logger);
        return await dropdown.isVisible(timeout);
    }

    async clickDropdownSortingButton(options?: Object) {
        const locator = new Label('dropdown "Най-популярни"',
            this.page.locator('(//span[text()="Най-популярни"])[1]'),
            this.logger);
        await locator.click(options);
    }

    async isVisibleFromLowToHigh(timeout?: Timeout) {
        const select = new Label("Dropdown: Цена възх.",
            this.page.locator('(//a[text()="Цена възх."])[1]'),
            this.logger);
        return await select.isVisible(timeout);
    }

    async clickFromLowToHigh(options?: Object) {
        const link = new Link("Dropdown 'Цена възх'",
            this.page.getByRole('link', {name: 'Цена възх.'}).first(),
            this.logger);
        await link.click(options);
    }

}

export default Filter;