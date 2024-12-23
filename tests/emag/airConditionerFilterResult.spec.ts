//import { test, expect } from '@playwright/test';
import {test, expect} from "../../fixtures/hook";
import {Timeout} from "../../utils/Timeout";
import {Browser} from "../../framework/Browser";
import {ProductTestID} from "../../utils/ProductsTestID";
import CardView from '../../page-objects/CardView';
import HomePage from '../../page-objects/HomePage';
import TopNavigation from '../../page-objects/TopNavigation';
import Filter from '../../page-objects/Filter';
import Pagination from '../../page-objects/Pagination';
import Logger from "../../framework/Logger";
import * as allure from "allure-js-commons";
import {PageSize} from "../../page-objects/PageSize";


const logger = Logger.getInstance('airConditionerFilterResult');
const title = 'Air conditioners Filter Result';

test(title, async ({page}, testInfo) => {
    const brandName = "Daikin";
    const browser = new Browser(logger, page);
    const nav = new TopNavigation(logger, page);
    const home = new HomePage(logger, page);
    const filter = new Filter(logger, page);
    const pagination = new Pagination(logger, page);
    const card = new CardView();

    await allure.description(title);

    await allure.step("Visit the Emag - online store", async () => {
        logger.logStep("Visit the Emag - online store");
        await browser.visitBaseUrl();
        expect(await page.title(),
            'Expected title: "eMAG.bg - Широка гама продукти"')
            .toBe('eMAG.bg - Широка гама продукти');
    });
    await allure.step("Accept cookies and close account login banner", async () => {
        logger.logStep("Accept cookies and close account login banner");
        await home.acceptCookies();
        await home.closeEnterInYourAccount();
        await home.closeBanner();
    });

    //Navigate to Airconditioners
    await allure.step("Navigate to Airconditioners", async () => {
        logger.logStep("Navigate to Airconditioners");
        await nav.clickLocator('Големи електроуреди', {timeout: Timeout.MIDDLE});
        await nav.clickLinkLocatorExactName('Климатици', true, {timeout: Timeout.MIDDLE});
    });

    await allure.step("Filter by brand name: " + brandName, async () => {
        logger.logStep("Filter by brand name: " + brandName);
        await filter.expandBrandSearchFilter({timeout: Timeout.MIDDLE});
        const isBrandVisibleOnFilter = await filter.isVisibleBrandById(ProductTestID.DAIKIN, {timeout: Timeout.SMALL});
        expect(
            isBrandVisibleOnFilter,
            `Expected brand button "${ProductTestID.DAIKIN}" to be presented`
        ).toEqual(true);
        await filter.clickBrandByTestId(ProductTestID.DAIKIN, Timeout.EXTENSIVE);
        expect(
            await filter.isVisibleFilter(Timeout.EXTENSIVE),
            'Expected button "Филтрирай" to be presented'
        ).toEqual(true);
        await filter.clickFilter({timeout: Timeout.SMALL});
        expect(
            await home.getHeadingName('Климатици Daikin', {timeout: Timeout.EXTENSIVE}),
            'Expected Title "Климатици Daikin" to be presented'
        ).toEqual(true);
    });

    await allure.step("Get all card titles from the page 1 and compare it to the brand name", async () => {
        logger.logStep("Get all card titles from the page 1 and compare it to the brand name");
        const cardViewPage1 = await card.getAllCardViewTitles(page);
        const itemCount = await card.getCardsCount(page);
        const isCountCardCorrect = await itemCount === PageSize.DEFAULT_PAGINATION_NUMBER;
        expect(
            isCountCardCorrect,
            `Expected result: CardView to have ${PageSize.DEFAULT_PAGINATION_NUMBER} items, Actual result ` + itemCount
        ).toEqual(true);

        for (let i = 1; i <= cardViewPage1.length; i++) {
            const cardFragment = card.getCardViewFragment(page, i, logger);
            const titleText: string = await cardFragment.getProductTitle();
            expect(titleText.toLowerCase()).toContain(brandName.toLowerCase());
        }
    });

    await allure.step("Navigate to page 2", async () => {
        logger.logStep("Navigate to page 2");
        expect(
            await pagination.getPageNumerLink(2, {timeout: Timeout.EXTENSIVE}),
            'Expected pagination button for page "2" to be presented'
        ).toEqual(true);
        await pagination.clickPageNumerLink(2, {timeout: Timeout.MIDDLE});
        //Check if the page 2 is active
        expect(
            await pagination.isActivePageNumer(2, {timeout: Timeout.HUGE}),
            'Expected active page with number "2" to be presented'
        ).toEqual(true);
    });

    await allure.step("Get all card titles from the page 2 and compare it to the brand name", async () => {
        logger.logStep("Get all card titles from the page 2 and compare it to the brand name");
        const cardViewPage2 = await card.getAllCardViewTitles(page);
        for (let i = 1; i <= cardViewPage2.length; i++) {
            const cardFragment = card.getCardViewFragment(page, i, logger);
            const titleText: string = await cardFragment.getProductTitle();
            expect(titleText.toLowerCase()).toContain(brandName.toLowerCase());
        }
    });

    await allure.step("Sort the products price (Цена възх.)", async () => {
        logger.logStep("Sort the products price (Цена възх.)");
        await browser.scrollToTop();
        expect(
            await filter.isVisibleDropdownSortingButton(Timeout.HUGE),
            'Expected dropdown select to be presented'
        ).toEqual(true);
        await filter.clickDropdownSortingButton({timeout: Timeout.MIDDLE, force: true});
        expect(
            await filter.isVisibleFromLowToHigh(Timeout.EXTENSIVE),
            'Expected dropdown select "Цена възх" to be presented'
        ).toEqual(true);
        await filter.clickFromLowToHigh({timeout: Timeout.MIDDLE, force: true});
        //Wait until loading over and the page 1 is active
        expect(
            await pagination.isActivePageNumer(1, {timeout: Timeout.HUGE}),
            'Expected active page with number "1" to be presented'
        ).toEqual(true);
    });

    //Compare the product price for the items in page 1 (from top to bottom)
    await allure.step("Compare the product price for the items in page 1 (from top to bottom)", async () => {
        logger.logStep("Compare the product price for the items in page 1 (from top to bottom)");
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

        //await allure.attachment("Log file", 'text/plain',"log-results/" + logger.getLogFileName());
    });

});

/*
Test Case 2
Step: Open eMAG.bg
Expected result: The browser tab title is “eMAG.bg - Широка гама продукти”
Step: Navigate to “Големи електроуреди – Климатици”
Expected result: The browser tab contains the string “Климатици” and the section title on the page is “Климатици”
Step: Under the section “Производител” click “виж повече”. Type Daikin in the search field. Check the Daikin checkbox. Click the “Филтрирай” button.
Expected result: Verify that each search result on the first 2 pages contains the word “Daikin” in its title.
Step: Sort the results by price in descending order from high to low.
Expected result: The price of products in the results (from top to bottom) should be equal to or higher than the price of the following product.
*/