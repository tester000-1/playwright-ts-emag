import {test, expect} from '@playwright/test';
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

const logger = new Logger('electricalRazorsFilterResult');
const title = 'Emag electrical razors filter result';

test.beforeAll(async () => {
    logger.info('Test name: ' + title);
});

test.afterAll(async () => {
    logger.info('End of the test with name: ' + title);
});

test(title, async ({page}) => {
    const brandName = "Braun";
    const browser = new Browser(logger);
    const nav = new TopNavigation(logger);
    const home = new HomePage(logger);
    const filter = new Filter(logger);
    const pagination = new Pagination(logger);
    const card = new CardView(logger);
    const utils = new Utils();

    await browser.visitBaseUrl(page);
    expect(await page.title(),
        'Expected title: "eMAG.bg - Широка гама продукти"')
        .toBe('eMAG.bg - Широка гама продукти');
    await home.acceptCookies(page).click({timeout: Timeout.MIDDLE});
    await home.btnEnterInYourAccount(page).click({timeout: Timeout.MIDDLE});
    await home.btnCloseBanner(page).click({timeout: Timeout.MIDDLE});
    await nav.getLinkLocator(page, ' Здраве и красота').click({timeout: Timeout.MIDDLE});
    await nav.getLinkLocatorExactName(page, 'Ел. самобръсначки', true).click({timeout: Timeout.MIDDLE});
    await expect(home.getH1WithText(page, 'Ел. самобръсначки'),
        'Expected title: Ел. самобръсначки')
        .toBeVisible({timeout: Timeout.EXTENSIVE});
    await filter.expandBrandSearchFilter(page).click({timeout: Timeout.MIDDLE});
    await expect(
        filter.getBrandByTestId(page, ProductTestID.BRAUN),
        'Expected name "Braun id 447" to be presented'
    ).toBeVisible({timeout: Timeout.EXTRA_EXTENSIVE});
    await filter.getBrandByTestId(page, ProductTestID.BRAUN).click();
    await expect(
        filter.getButtonFilter(page),
        'Expected button "Филтрирай" to be presented'
    ).toBeVisible({timeout: Timeout.EXTENSIVE});
    await filter.getButtonFilter(page).click({timeout: Timeout.EXTENSIVE});
    await expect(
        home.getHeadingName(page, 'Ел. самобръсначки ' + brandName),
        'Expected Title "Ел. самобръсначки ' + brandName + '" to be presented'
    ).toBeVisible({timeout: Timeout.EXTENSIVE});
    const cardViewPage1 = await card.getAllCardViewTitles(page);
    logger.debug('arrays ->>>> ' + (await page.locator('//h2[@class="card-v2-title-wrapper"]').all()).length);
    const itemCount = (await page.locator('//h2[@class="card-v2-title-wrapper"]').all()).length;
    expect(
        itemCount == 60,
        'Expected result: CardView to have 60 items, Actual result ' + itemCount
    ).toBeTruthy();

    for (let i = 1; i <= cardViewPage1.length; i++) {
        const cardFragment = card.getCardViewFragment(page, i);
        const titleText: string = await cardFragment.getCardViewTitleByIndex();
        expect(titleText.toLowerCase()).toContain(brandName.toLowerCase());
        logger.debug('--------- i : ' + i)
    }
    //Navigate to page 2
    await expect(
        pagination.getPageNumerLink(page, 2),
        'Expected pagination button for page "2" to be presented'
    ).toBeVisible({ timeout: Timeout.EXTENSIVE });
    await pagination.getPageNumerLink(page, 2).click({ timeout: Timeout.MIDDLE });
    //Check if the page 2 is active
    await expect(
        pagination.getActivePageNumer(page, 2),
        'Expected active page with number "2" to be presented'
    ).toBeVisible({ timeout: Timeout.HUGE });
    //Get all card titles from the page 2 and compare it to the brand name
    const cardViewPage2 = await card.getAllCardViewTitles(page);
    for (let i = 1; i <= cardViewPage2.length; i++) {
        const cardFragment = card.getCardViewFragment(page, i);
        const titleText: string = await cardFragment.getCardViewTitleByIndex();
        expect(titleText.toLowerCase()).toContain(brandName.toLowerCase());
        logger.debug('--------- i2 : ' + i)
    }
    //Sort the products price (Цена възх.)
    await browser.scrollTop(page);
    await expect(
        filter.getDropdownSortingButton(page),
        'Expected dropdown select to be presented'
    ).toBeVisible({ timeout: Timeout.HUGE });
    await filter.getDropdownSortingButton(page).click({ timeout: Timeout.MIDDLE, force: true });
    await expect(
        filter.getDropdownSelectFromLowToHigh(page),
        'Expected dropdown select "Цена възх" to be presented'
    ).toBeVisible({ timeout: Timeout.EXTENSIVE });
    await filter.getDropdownSelectFromLowToHighLink(page).first().click({ timeout: Timeout.MIDDLE, force: true });
    //Wait until loading over and the page 1 is active
    await expect(
        pagination.getActivePageNumer(page, 1),
        'Expected active page with number "1" to be presented'
    ).toBeVisible({ timeout: Timeout.HUGE });
    //Compare the product price for the items in page 1 (from top to bottom)
    const cardPrice = await card.getAllCardViewPrices(page);
    let oldPrice: number = 0;
    for (let i = 1; i <= cardPrice.length; i++) {
        const cardFragment = card.getCardViewFragment(page, i);
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


});

/*
Test Case 3
Step: Open eMAG.bg
Expected result: The browser tab title is “eMAG.bg - Широка гама продукти”
Step: Navigate to “Здраве и красота – Ел. самобръсначки”
Expected result: The browser tab contains the string “Електрически самобръсначки” and the section title on the page is “Ел. самобръсначки”
Step: Under the section “Производител” click “виж повече”. Type Braun in the search field. Check the Braun checkbox. Click the “Филтрирай” button.
Expected result: Verify that each search result on the first 2 pages contains the word “Braun” in its title.
Step: Sort the results by price in descending order from high to low.
Expected result: The price of products in the results (from top to bottom) should be equal to or higher than the price of the following product.
*/