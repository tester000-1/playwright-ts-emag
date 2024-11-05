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

test('Air conditioners Filter Result', async ({ page }) => {
  const brandName = "Daikin";
  const browser = new Browser();
  const nav = new TopNavigation();
  const home = new HomePage();
  const filter = new Filter();
  const pagination = new Pagination();
  const card = new CardView();
  const utils = new Utils();

  await browser.visitBaseUrl(page);
  //Check Emag title
  await expect(await page.title(),
    'Expected title: "eMAG.bg - Широка гама продукти"')
    .toBe('eMAG.bg - Широка гама продукти');
  //Accept cookies and close account login banner
  await home.acceptCookies(page);
  //Navigate to Airconditioners
  await nav.getLinkLocator(page, 'Големи електроуреди').click({ timeout: Timeout.MIDDLE });
  await nav.getLinkLocatorExactName(page, 'Климатици', true).click({ timeout: Timeout.MIDDLE });
  //Check all brands
  await filter.expandBrandSearchFilter(page).click({ timeout: Timeout.MIDDLE });
  //Check if Brand name is presented
  await expect(
    filter.getBrandByTestId(page, ProductTestID.DAIKIN),
    'Expected name "Daikin" to be presented'
  ).toBeVisible({ timeout: Timeout.EXTENSIVE });
  await filter.getBrandByTestId(page, ProductTestID.DAIKIN).click({ timeout: Timeout.SMALL });
  //Filter results
  await expect(
    filter.getButtonFilter(page),
    'Expected button "Филтрирай" to be presented'
  ).toBeVisible({ timeout: Timeout.EXTENSIVE });
  await filter.getButtonFilter(page).click({ timeout: Timeout.SMALL });
  //Check for result title
  await expect(
    home.getHeadingName(page, 'Климатици Daikin'),
    'Expected Title "Климатици Daikin" to be presented'
  ).toBeVisible({ timeout: Timeout.EXTENSIVE });
  //Get all card titles from the page 1 and compare it to the brand name

  const cardViewPage1 = await card.getAllCardViewTitles(page);
  // console.log('arrays ->>>> ' + (await page.locator('//h2[@class="card-v2-title-wrapper"]').all()).length)
  // await expect(
  //   await card.getAllCardViewTitles(page).length == 60,
  //   'Expected result: CardView to have 60 items'
  // ).toBeTruthy();

  for (let i = 1; i <= cardViewPage1.length; i++) {
    const cardFragment = await card.getCardViewFragment(page, i);
    const titleText: string = await cardFragment.getCardViewTitleByIndex();
    await expect(titleText.toLowerCase()).toContain(brandName.toLowerCase());
    console.log('--------- i : ' + i)
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
    const cardFragment = await card.getCardViewFragment(page, i);
    const titleText: string = await cardFragment.getCardViewTitleByIndex();
    await expect(titleText.toLowerCase()).toContain(brandName.toLowerCase());
    console.log('--------- i2 : ' + i)
  }
  //Sort the products price (Цена възх.)
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
  for (let i = 1; i <= cardPrice.length; i++) {
    const cardFragment = await card.getCardViewFragment(page, i);
    const priceText: string = await cardFragment.getCardViewPriceByIndex();
    const data: string = utils.convertStringPriceToInt(priceText).toLowerCase();
    const newPrice: number = parseInt(data);
    console.log(" newPrice: " + newPrice)
    const validPrice: boolean = newPrice === oldPrice || newPrice > oldPrice;
    console.log(`new price: ${newPrice} | old price: ${oldPrice}`)
    await expect(validPrice).toBeTruthy();
    console.log(i + " true: " + validPrice)
    oldPrice = newPrice;


    //console.log('old price ' + oldPrice)
    //console.log('index ' + element)
    //const data: string = utils.convertStringPriceToInt(await element.innerText());
    //console.log( " data: " + data)
    //const newPrice: number = parseInt(data);
    //console.log( " newPrice: " + newPrice)
    //const validPrice: boolean = newPrice === oldPrice || newPrice > oldPrice;
    //console.log(`new price: ${newPrice} | owd price: ${oldPrice}`)
    //await expect(validPrice).toBeTruthy();
    //console.log(element + " true: " + validPrice)
    //oldPrice = newPrice;
  }

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