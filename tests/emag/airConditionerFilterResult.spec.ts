//import { test, expect } from '@playwright/test';
import {test, expect} from "../../fixtures/hook";
import {Timeout} from "../../utils/Timeout";
import {Browser} from "../../framework/Browser";
import {ProductTestID} from "../../utils/ProductsTestID";
import Utils from "../../utils/Utils";
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
    const browser = new Browser(logger);
    const nav = new TopNavigation(logger);
    const home = new HomePage(logger);
    const filter = new Filter(logger);
    const pagination = new Pagination(logger);
    const card = new CardView();
    const utils = new Utils();

    await allure.description(title);

    await allure.step("Visit the Emag - online store", async () => {
        Logger.logStep("Visit the Emag - online store");
        await browser.visitBaseUrl(page);
        expect(await page.title(),
            'Expected title: "eMAG.bg - Широка гама продукти"')
            .toBe('eMAG.bg - Широка гама продукти');
    });
    await allure.step("Accept cookies and close account login banner", async () => {
        Logger.logStep("Accept cookies and close account login banner");
        await home.acceptCookies(page).click({timeout: Timeout.MIDDLE});
        await home.btnEnterInYourAccount(page).click({timeout: Timeout.MIDDLE});
        await home.btnCloseBanner(page).click({timeout: Timeout.MIDDLE});
    });

    //Navigate to Airconditioners
    await allure.step("Navigate to Airconditioners", async () => {
        Logger.logStep("Navigate to Airconditioners");
        await nav.getLinkLocator(page, 'Големи електроуреди').click({timeout: Timeout.MIDDLE});
        await nav.getLinkLocatorExactName(page, 'Климатици', true).click({timeout: Timeout.MIDDLE});
    });

    await allure.step("Filter by brand name: " + brandName, async () => {
        Logger.logStep("Filter by brand name: " + brandName);
        await filter.expandBrandSearchFilter(page).click({timeout: Timeout.MIDDLE});
        await expect(
            filter.getBrandByTestId(page, ProductTestID.DAIKIN),
            'Expected name "Daikin" to be presented'
        ).toBeVisible({timeout: Timeout.EXTENSIVE});
        await filter.getBrandByTestId(page, ProductTestID.DAIKIN).click({timeout: Timeout.SMALL});
        await expect(
            filter.getButtonFilter(page),
            'Expected button "Филтрирай" to be presented'
        ).toBeVisible({timeout: Timeout.EXTENSIVE});
        await filter.getButtonFilter(page)
        await filter.getButtonFilter(page).click({timeout: Timeout.SMALL});
        await expect(
            home.getHeadingName(page, 'Климатици Daikin'),
            'Expected Title "Климатици Daikin" to be presented'
        ).toBeVisible({timeout: Timeout.EXTENSIVE});
    });

    await allure.step("Get all card titles from the page 1 and compare it to the brand name", async () => {
        Logger.logStep("Get all card titles from the page 1 and compare it to the brand name");
        const cardViewPage1 = await card.getAllCardViewTitles(page);
        const itemCount = await card.getCardsCount(page);
        const isCountCardCorrect = itemCount === PageSize.DEFAULT_PAGINATION_NUMBER;
        expect(
            isCountCardCorrect,
            `Expected result: CardView to have ${PageSize.DEFAULT_PAGINATION_NUMBER} items, Actual result ` + itemCount
        ).toBeTruthy();

        for (let i = 1; i <= cardViewPage1.length; i++) {
            const cardFragment = card.getCardViewFragment(page, i, logger);
            const titleText: string = await cardFragment.getCardViewTitleByIndex();
            expect(titleText.toLowerCase()).toContain(brandName.toLowerCase());
        }
    });

    await allure.step("Navigate to page 2", async () => {
        Logger.logStep("Navigate to page 2");
        await expect(
            pagination.getPageNumerLink(page, 2),
            'Expected pagination button for page "2" to be presented'
        ).toBeVisible({timeout: Timeout.EXTENSIVE});
        await pagination.getPageNumerLink(page, 2).click({timeout: Timeout.MIDDLE});
        //Check if the page 2 is active
        await expect(
            pagination.getActivePageNumer(page, 2),
            'Expected active page with number "2" to be presented'
        ).toBeVisible({timeout: Timeout.HUGE});
    });

    await allure.step("Get all card titles from the page 2 and compare it to the brand name", async () => {
        Logger.logStep("Get all card titles from the page 2 and compare it to the brand name");
        const cardViewPage2 = await card.getAllCardViewTitles(page);
        for (let i = 1; i <= cardViewPage2.length; i++) {
            const cardFragment = card.getCardViewFragment(page, i, logger);
            const titleText: string = await cardFragment.getCardViewTitleByIndex();
            expect(titleText.toLowerCase()).toContain(brandName.toLowerCase());
        }
    });

    await allure.step("Sort the products price (Цена възх.)", async () => {
        Logger.logStep("Sort the products price (Цена възх.)");
        await browser.scrollTop(page);
        await expect(
            filter.getDropdownSortingButton(page),
            'Expected dropdown select to be presented'
        ).toBeVisible({timeout: Timeout.HUGE});
        await filter.getDropdownSortingButton(page).click({timeout: Timeout.MIDDLE, force: true});
        await expect(
            filter.getDropdownSelectFromLowToHigh(page),
            'Expected dropdown select "Цена възх" to be presented'
        ).toBeVisible({timeout: Timeout.EXTENSIVE});
        await filter.getDropdownSelectFromLowToHighLink(page).first().click({timeout: Timeout.MIDDLE, force: true});
        //Wait until loading over and the page 1 is active
        await expect(
            pagination.getActivePageNumer(page, 1),
            'Expected active page with number "1" to be presented'
        ).toBeVisible({timeout: Timeout.HUGE});
    });

    //Compare the product price for the items in page 1 (from top to bottom)
    await allure.step("Compare the product price for the items in page 1 (from top to bottom)", async () => {
        Logger.logStep("Compare the product price for the items in page 1 (from top to bottom)");
        const cardPrice = await card.getAllCardViewPrices(page);
        let oldPrice: number = 0;
        for (let i = 1; i <= cardPrice.length; i++) {
            const cardFragment = card.getCardViewFragment(page, i, logger);
            const priceText: string = await cardFragment.getCardViewPriceByIndex();
            const data: string = utils.convertStringPriceToInt(priceText).toLowerCase();
            const newPrice: number = parseInt(data);
            logger.debug("newPrice: " + newPrice);
            const validPrice: boolean = newPrice === oldPrice || newPrice > oldPrice;
            logger.debug(`new price: ${newPrice} | old price: ${oldPrice}`)
            expect(validPrice).toBeTruthy();
            logger.debug(i + " true: " + validPrice);
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