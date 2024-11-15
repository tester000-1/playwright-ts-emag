import { test, expect } from '@playwright/test';
import Browser from '../../framework/Browser';
import HomePage from '../../page-objects/HomePage';
import Logger from "../../framework/Logger";
import {Timeout} from "../../utils/Timeout";
import SocialMediaPage from "../../page-objects/SocialMediaPage";

const logger = new Logger('socialMediaLinks');
const title = 'Social media links';

test.beforeAll(async () => {
  logger.info('Test name: ' + title);
});

test.afterAll(async () => {
  logger.info('End of the test with name: ' + title);
});

test(title, async ({ page }) => {
  const socialMediaPage = new SocialMediaPage(logger);
  const browser = new Browser(logger);
  const home = new HomePage(logger);
  await browser.visitBaseUrl(page);
  await home.acceptCookies(page).click({ timeout: Timeout.MIDDLE });
  await home.btnEnterInYourAccount(page).click({ timeout: Timeout.MIDDLE });
  await home.btnCloseBanner(page).click({ timeout: Timeout.MIDDLE });
  const page1Promise = page.waitForEvent('popup');
  await socialMediaPage.getFacebookLink(page).click();
  const page1 = await page1Promise;
  //https://www.facebook.com/eMAGbg
  expect(
      page1.url(),
      'Expected correct URL for Facebook to be presented'
  ).toEqual(process.env.FACEBOOK)
  await page1.close();
  const page2Promise = page.waitForEvent('popup');
  await socialMediaPage.getYoutubeLink(page).click();
  const page2 = await page2Promise;
  await socialMediaPage.getAcceptCookiesYouTube(page2).click();
  const youtubeVerifier: boolean = page2.url().includes('' + process.env.YOUTUBE)
  expect(
      youtubeVerifier,
      'Expected correct URL for Youtube to be presented'
  ).toBeTruthy();
  await page2.close();
  //https://www.youtube.com/channel/UC5y5r9BY5IiT4MkBrMtZRnA
  const page3Promise = page.waitForEvent('popup');
  await socialMediaPage.getInstagramLink(page).click({timeout: Timeout.MIDDLE});
  const page3 = await page3Promise;
  //https://www.instagram.com/emag.bg_official/
  // await socialMediaPage.acceptAllCookiesInstagram(page3).click({timeout: Timeout.EXTRA_EXTENSIVE});
  // await socialMediaPage.acceptCookiesCloseBtnInstagram(page3).click({timeout: Timeout.MIDDLE});
  expect(
      page3.url(),
      'Expected correct URL for Instagram to be presented'
  ).toEqual(process.env.INSTAGRAM)
});

/*
Test Case 6
Step: Open eMAG.bg
Expected result: The browser tab title is “eMAG.bg - Широка гама продукти”
Step: Click the Facebook icon
Expected result: The correct link
eMAG Bulgaria | Sofia
is opened in a new tab.
Step: Close the Facebook tab
Expected result: The number of opened tabs is 1.
Step: Click the Youtube icon
Expected result: The correct link
eMAG Bulgaria
is opened in a new tab.
Step: Close the Youtube tab
Expected result: The number of opened tabs is 1.
Step: Click the Instagram icon
Expected result: The correct link
Instagram (@emag.bg_official)
is opened in a new tab.
Step: Close the Instagram tab
Expected result: The number of opened tabs is 1.
*/