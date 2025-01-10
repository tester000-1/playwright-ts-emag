//import { test, expect } from '@playwright/test';
import { test, expect } from "../../fixtures/hook";
import Browser from '../../framework/Browser';
import HomePage from '../../page-objects/HomePage';
import Logger from "../../framework/Logger";
import {Timeout} from "../../utils/Timeout";
import SocialMediaPage from "../../page-objects/SocialMediaPage";
import * as allure from "allure-js-commons";

const logger = Logger.getInstance('socialMediaLinks');
const title = 'Social media links';

test(title, async ({ page }) => {
  const socialMediaPage = new SocialMediaPage(logger, page);
  const browser = new Browser(logger, page);
  const home = new HomePage(logger, page);

  await allure.step("Visit Emag and accept cookies", async () => {
    logger.logStep("Visit Emag and accept cookies");
    await browser.visitBaseUrl();
    await home.acceptCookies();
    await home.closeEnterInYourAccount();
    await home.closeBanner();
  });
  await allure.step("Open a new tab to FB social network", async () => {
    logger.logStep("Open a new tab to FB social network");
    const page1Promise = page.waitForEvent('popup', {timeout: Timeout.EXTRA_EXTENSIVE});
    await socialMediaPage.clickFacebookLink();
    const page1 = await page1Promise;
    //https://www.facebook.com/eMAGbg
    expect(
        page1.url(),
        'Open new tab to FB social network'
    ).toEqual("https://www.facebook.com/eMAGbg")
    await page1.close();
  });
  await allure.step("Open a new tab to Youtube social network", async () => {
    logger.logStep("Open a new tab to Youtube social network");
    const page2Promise = page.waitForEvent('popup', {timeout: Timeout.EXTRA_EXTENSIVE});
    await socialMediaPage.clickYoutubeLink();
    const page2 = await page2Promise;
    await socialMediaPage.acceptCookiesYouTube(page2);
    const youtubeVerifier: boolean = page2.url().includes("https://www.youtube.com/channel/UC5y5r9BY5IiT4MkBrMtZRnA")
    expect(
        youtubeVerifier,
        'Expected correct URL for Youtube to be presented'
    ).toBeTruthy();
    //https://www.youtube.com/channel/UC5y5r9BY5IiT4MkBrMtZRnA
    await page2.close();
  });
  await allure.step("Open a new tab to Instagram social network", async () => {
    logger.logStep("Open a new tab to Instagram social network");
    const page3Promise = page.waitForEvent('popup');
    await socialMediaPage.clickInstagramLink(page, Timeout.MIDDLE);
    const page3 = await page3Promise;
    //https://www.instagram.com/emag.bg_official/
    await socialMediaPage.acceptAllCookiesInstagram(page3, Timeout.EXTRA_EXTENSIVE);
    await socialMediaPage.acceptCookiesCloseBtnInstagram(page3,Timeout.MIDDLE);
    expect(
        page3.url(),
        'Expected correct URL for Instagram to be presented'
    ).toEqual("https://www.instagram.com/emag.bg_official/");
  });

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