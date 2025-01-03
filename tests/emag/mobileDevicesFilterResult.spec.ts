//import {test, expect} from '@playwright/test';
import { test, expect } from "../../fixtures/hook";
import {Timeout} from "../../utils/Timeout";
import browser, {Browser} from "../../framework/Browser";
import {ProductTestID} from "../../utils/ProductsTestID";
import CardView from '../../page-objects/CardView';
import HomePage from '../../page-objects/HomePage';
import TopNavigation from '../../page-objects/TopNavigation';
import Filter from '../../page-objects/Filter';
import Pagination from '../../page-objects/Pagination';
import Logger from "../../framework/Logger";
import {PageSize} from "../../page-objects/PageSize";
import * as allure from "allure-js-commons";
import Utils from "../../utils/Utils";


const logger = Logger.getInstance('mobileDevicesFilterResult');
const title = 'Mobile devices Filter result';

test(title, async ({page}) => {
    const brandName = "Samsung";
    const browser = new Browser(logger, page);
    const nav = new TopNavigation(logger, page);
    const home = new HomePage(logger, page);
    const filter = new Filter(logger, page);
    const pagination = new Pagination(logger, page);
    const card = new CardView();

    await allure.step("Navigate to Emag and accept cookies", async () => {
        logger.logStep("Navigate to Emag and accept cookies");
        await browser.visitBaseUrl();
        expect(await page.title(),
            'Expected title: "eMAG.bg - Широка гама продукти"')
            .toBe('eMAG.bg - Широка гама продукти');
        await home.acceptCookies();
        await home.closeEnterInYourAccount();
        await home.closeBanner();
    });

    await allure.step("Navigate to Мобилни телефони", async () => {
        logger.logStep("Navigate to Мобилни телефони");
        await nav.clickLocator('Телефони, Таблети & Лаптопи', Timeout.MIDDLE);
        await nav.clickLinkLocatorExactName( 'Мобилни телефони', true, Timeout.MIDDLE);
        await expect(
            await home.getProductHeader('Мобилни телефони'),
            'Expected title: Мобилни телефони')
            .toBeVisible({timeout: Timeout.EXTENSIVE});
    });

    await allure.step("Filter for brand name: " + brandName, async () => {
        logger.logStep("Filter for brand name: " + brandName);
        await filter.expandBrandSearchFilter(Timeout.MIDDLE);
        const isProductVisible = await filter.isVisibleBrandById(ProductTestID.SAMSUNG, Timeout.EXTENSIVE);
        expect(
            isProductVisible,
            `Expected name "${brandName} id ${ProductTestID.SAMSUNG}" to be presented`
        ).toBe(true);
        await filter.clickBrandByTestId(ProductTestID.SAMSUNG, Timeout.EXTENSIVE);
        expect(
            await filter.isVisibleFilter(Timeout.EXTENSIVE),
            'Expected button "Филтрирай" to be presented'
        ).toEqual(true);
        await filter.clickFilter(Timeout.SMALL);
        expect(
            await home.getHeadingName('Мобилни телефони ' + brandName),
            'Expected Title "Мобилни телефони ' + brandName + '" to be presented'
        ).toBe(true);
    });

    await allure.step("Check the result count and check if the brand name is contained in the card's title", async () => {
        logger.logStep("Check the result count and check if the brand name is contained in the card's title");
        const cardViewPage1 = await card.getAllCardViewTitles(page);
        const itemCount = await card.getCardsCount(page);
        const isCountCardCorrect = itemCount === PageSize.DEFAULT_PAGINATION_NUMBER;
        expect(
            isCountCardCorrect,
            `Expected result: CardView to have ${PageSize.DEFAULT_PAGINATION_NUMBER} items, Actual result ` + itemCount
        ).toEqual(true);

        for (const element of cardViewPage1) {
            const title = await element.innerText();
            expect(title.toLocaleLowerCase()).toContain(brandName.toLocaleLowerCase());
        }
    });

    await allure.step("Navigate to page 2 and check if the brand name is contained in the card's title", async () => {
        logger.logStep("Navigate to page 2 and check if the brand name is contained in the card's title");
        expect(
            await pagination.getPageNumerLink( 2, Timeout.EXTENSIVE),
            'Expected pagination button for page "2" to be presented'
        ).toBe(true);
        await pagination.clickPageNumerLink( 2, Timeout.MIDDLE);
        expect(
            await pagination.isActivePageNumer(2, Timeout.HUGE),
            'Expected active page with number "2" to be presented'
        ).toBe(true);
        //Get all card titles from the page 2 and compare it to the brand name
        const cardViewPage2 = await card.getAllCardViewTitles(page);
        for (const element of cardViewPage2) {
            const title = await element.innerText();
            expect(title.toLocaleLowerCase()).toContain(brandName.toLocaleLowerCase());
        }
    });

    await allure.step("Sort products by price (from low to higher)", async () => {
        logger.logStep("Sort products by price (from low to higher)");
        await browser.scrollToTop();
        expect(
            await filter.isVisibleDropdownSortingButton(Timeout.HUGE),
            'Expected dropdown select to be presented'
        ).toBe(true);
        await filter.clickDropdownSortingButton({timeout: Timeout.MIDDLE, force: true});
        expect(
            await filter.isVisibleFromLowToHigh(Timeout.EXTENSIVE),
            'Expected dropdown select "Цена възх" to be presented'
        ).toBe(true);
        await filter.clickFromLowToHigh({timeout: Timeout.MIDDLE, force: true});
        //Wait until loading over and the page 1 is active
        expect(
            await pagination.isActivePageNumer(1, {timeout: Timeout.HUGE}),
            'Expected active page with number "1" to be presented'
        ).toBe(true);
    });

    await allure.step("Compare the product price for the items in page 1 (from top to bottom)", async () => {
        logger.logStep("Compare the product price for the items in page 1 (from top to bottom)");
        //Compare the product price for the items in page 1 (from top to bottom)
        const cardPrice = await card.getAllCardViewPrices(page);
        let oldPrice: number = 0;
        for (let i = 1; i <= cardPrice.length; i++) {
            const cardFragment = card.getCardViewFragment(page, i, logger);
            let priceText: string;
            priceText = await cardFragment.getOldPrice();
            if(priceText === "none"){
                logger.debug("No promo price: " + priceText);
                priceText = await cardFragment.getFinalPrice();
            }
            const data: string = priceText
                .replace("от", "")
                .replace("лв.", "")
                .replace(",", "")
                .replace(".", "")
                .toLowerCase();
            const newPrice: number = parseInt(data);
            const validPrice: boolean = newPrice === oldPrice || newPrice > oldPrice;
            logger.debug(`new price: ${newPrice} | old price: ${oldPrice}`)
            expect(validPrice).toBe(true);
            oldPrice = newPrice;
        }
    });

});

/*
Test Case 1
Step: Open eMAG.bg
Expected result: The browser tab title is “eMAG.bg - Широка гама продукти”
Step: Navigate to “Телефони Таблети & Лаптопи – Мобилни телефони и аксесоари - Мобилни телефони”
Expected result: The browser tab contains the string “Мобилни телефони” and the section title on the page is “Мобилни телефони”
Step: Under the section “Производител” click “виж повече”. Type Samsung in the search field. Check the Samsung checkbox. Click the “Филтрирай” button.
Expected result: Verify that each search result on the first 2 pages contains the word “Samsung” in its title.
Step: Sort the results by price in descending order from high to low.
Expected result: The price of products in the results (from top to bottom) should be equal to or higher than the price of the following product.
 */