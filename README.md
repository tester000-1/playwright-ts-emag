# Automation testing on website emag.bg via Playwright

## Software

<p><b>Tools:</b> Playwright, TypeScript, Node.js, Allure, Log4js, dotenv</p>

### Playwright commands

<p>npx playwright test</p>
<p>npx playwright test --ui</p>
<p>npx playwright test --debug</p>
<p>npx playwright test --headed</p>
<p>npx playwright test --project webkit --project chromium</p>
<p>npx playwright test landing-page.spec.ts</p>
<p>npx playwright test tests/emag/ tests/landing-page/</p>
<p>npx playwright show-report</p>
<p>npx playwright test --workers=4</p>
<p>npx playwright test --reporter=dot</p>
<p>npx playwright test tests/emag/</p>

### Allure commands

<p>allure generate ./allure-results --clean</p>
<p>npm run gen-logs</p>
<p>allure serve</p>