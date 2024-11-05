import { test, expect } from '@playwright/test';
import { Timeout } from "../../utils/Timeout";
import { Browser } from "../../utils/Browser";
import { ProductTestID } from "../../utils/ProductsTestID";
import Utils from "../../utils/Utils";
import CardView from '../../page-objects/CardView';
import HomePage from '../../page-objects/HomePage';
import TopNavigation from '../../page-objects/TopNavigation';
import Filter from '../../page-objects/Filter';
import Pagination from '../../page-objects/Pagination';

test('Mobile devices Filter result', async ({ page }) => {
    const brandName = "Samsung";
    const browser = new Browser();
    const nav = new TopNavigation();
    const home = new HomePage();
    const filter = new Filter();
    const pagination = new Pagination();
    const card = new CardView();
    const utils = new Utils();

    await browser.visitBaseUrl(page);
    await browser.visitBaseUrl(page);
    await expect(await page.title(),
        'Expected title: "eMAG.bg - Широка гама продукти"')
        .toBe('eMAG.bg - Широка гама продукти');
    await home.acceptCookies(page);
    await nav.getLinkLocator(page, 'Телефони, Таблети & Лаптопи').click({ timeout: Timeout.MIDDLE });
    await nav.getLinkLocatorExactName(page, 'Мобилни телефони', true).click({ timeout: Timeout.MIDDLE });
    await expect(home.getH1WithText(page, 'Мобилни телефони'),
        'Expected title: Мобилни телефони')
        .toBeVisible({ timeout: Timeout.EXTENSIVE });
    await filter.expandBrandSearchFilter(page).click({ timeout: Timeout.MIDDLE });
    await expect(
        filter.getBrandByTestId(page, ProductTestID.SAMSUNG),
        'Expected name "Samsung id 42" to be presented'
    ).toBeVisible({ timeout: Timeout.EXTENSIVE });
    await filter.getBrandByTestId(page, ProductTestID.SAMSUNG).click({ force: true });
    await expect(
        filter.getButtonFilter(page),
        'Expected button "Филтрирай" to be presented'
    ).toBeVisible({ timeout: Timeout.EXTENSIVE });
    await filter.getButtonFilter(page).click({ timeout: Timeout.SMALL });
    await expect(
        home.getHeadingName(page, 'Мобилни телефони ' + brandName),
        'Expected Title "Мобилни телефони ' + brandName + '" to be presented'
    ).toBeVisible({ timeout: Timeout.EXTENSIVE });
    const cardViewPage1 = await card.getAllCardViewTitles(page);
    for (const element of cardViewPage1) {
        const title = await element.innerText();
        await expect(title.toLocaleLowerCase()).toContain(brandName.toLocaleLowerCase());
    }
    await expect(
        pagination.getPageNumerLink(page, 2),
        'Expected pagination button for page "2" to be presented'
    ).toBeVisible({ timeout: Timeout.EXTENSIVE });
    await pagination.getPageNumerLink(page, 2).click({ timeout: Timeout.MIDDLE });
    await expect(
        pagination.getActivePageNumer(page, 2),
        'Expected active page with number "2" to be presented'
    ).toBeVisible({ timeout: Timeout.HUGE });
    //Get all card titles from the page 2 and compare it to the brand name
    const cardViewPage2 = await card.getAllCardViewTitles(page);
    for (const element of cardViewPage2) {
        const title = await element.innerText();
        await expect(title.toLocaleLowerCase()).toContain(brandName.toLocaleLowerCase());
    }
    browser.scrollTop(page);
    await expect(
        filter.getDropdownSortingButton(page),
        'Expected dropdown select to be presented'
    ).toBeVisible({ timeout: Timeout.HUGE });
    await filter.getDropdownSortingButton(page).click({ timeout: Timeout.MIDDLE, force: true });
    await expect(
        filter.getDropdowsSelectFromLowToHigh(page),
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
    for (const element of cardPrice) {
        //console.log('old price ' + oldPrice)
        //console.log('index ' + element)
        const data: string = utils.convertStringPriceToInt(await element.innerText());
        //console.log(" data: " + data)
        const newPrice: number = parseInt(data);
        //console.log(" newPrice: " + newPrice)
        const validPrice: boolean = newPrice === oldPrice || newPrice > oldPrice;
        //console.log(`new price: ${newPrice} | owd price: ${oldPrice}`)
        await expect(validPrice).toBeTruthy();
        //console.log(element + " true: " + validPrice)
        oldPrice = newPrice;
    }


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