import { test as base } from "@playwright/test";
import Logger from "../framework/Logger";
import {Log4jsConfiguration} from "../framework/Log4jsConfiguration";
const path = require('path');

export const test = base.extend<{ testHook: void }>({
    testHook: [
        async ({}, use, testInfo) => {
            const titlePath = testInfo.titlePath;
            const testFullName = titlePath[0].toString();
            let testShortName = path.basename(testFullName);

            if (testShortName.includes('.ts') || testShortName.includes('.js')){
                testShortName = testShortName.replace('.ts', '')
                .replace('.js', '')
                .replace('.spec', '');
            }

            Log4jsConfiguration.configureLogging(testShortName);
            const logger = Logger.getInstance(testShortName);

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