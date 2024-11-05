import { test, expect } from '@playwright/test';
import Browser from '../../utils/Browser';
import HomePage from '../../page-objects/HomePage';

test('test', async ({ page }) => {
  const browser = new Browser();
  const home = new HomePage();
  await browser.visitBaseUrl(page);

  await home.acceptCookies(page);

  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '' }).click();
  const page1 = await page1Promise;
  //https://www.facebook.com/eMAGbg
  // await page1.getByRole('button', { name: 'Allow all cookies' }).click();
  // await page1.getByLabel('Close').click();
  await expect(
    page1.url(),
    'Expected correct URL for Facebook to be presented'
  ).toEqual(process.env.FACEBOOK)
  page1.close();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('button', { name: 'Accept all' }).click();
  const youtubeVerifier: boolean = await page2.url().includes('' + process.env.YOUTUBE)
  await expect(
    youtubeVerifier,
    'Expected correct URL for Youtube to be presented'
  ).toBeTruthy();
  page2.close();
  //https://www.youtube.com/channel/UC5y5r9BY5IiT4MkBrMtZRnA
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '' }).click();
  const page3 = await page3Promise;
  //https://www.instagram.com/emag.bg_official/
  await page3.getByRole('button', { name: 'Allow all cookies' }).click();
  await page3.getByRole('button', { name: 'Close' }).click();
  await expect(
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