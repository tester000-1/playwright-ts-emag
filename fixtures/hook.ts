import { test as base } from "@playwright/test";
import Logger from "../framework/Logger";

export const test = base.extend<{ testHook: void }>({
    testHook: [
        async ({}, use, testInfo) => {
            const titlePath = testInfo.titlePath;
            const testFullName = titlePath[0].split('\\');

            const SUFFIX_NAME_CHARACTERS = -8;
            const testShortName =  testFullName[testFullName.length -1].slice(0, SUFFIX_NAME_CHARACTERS);

            const logger = Logger.getInstance(testShortName);
            Logger.loggerConfig();

            logger.info("Test name: " + testInfo.title);
            // Any code here will be run as a before each hook

            await use();

            logger.info("End of the test with name: " + testInfo.title);
            // Put any code you want run automatically after each test here
        },
        { auto: true },
    ],
});

export { expect } from "@playwright/test";