import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { CustomWorld } from '../support/world';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

setDefaultTimeout(parseInt(process.env.DEFAULT_TIMEOUT ?? '60000'));

let sharedBrowser: Browser;

BeforeAll(async () => {
  const browserName = (process.env.BROWSER ?? 'chromium') as 'chromium' | 'firefox' | 'webkit';
  const headless = process.env.HEADLESS !== 'false';
  const slowMo = parseInt(process.env.SLOW_MO ?? '0');

  const launchers = { chromium, firefox, webkit };
  sharedBrowser = await launchers[browserName].launch({ headless, slowMo });

  // Ensure reports directory exists
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
});

Before(async function (this: CustomWorld, { pickle }) {
  this.browser = sharedBrowser;
  this.context = await this.browser.newContext({
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: false,
  });
  this.page = await this.context.newPage();

  // Capture response headers for security tests
  this.responseHeaders = {};
  this.page.on('response', (response) => {
    if (response.url().includes('dashboard.stripe.com/login') && response.status() === 200) {
      const headers = response.headers();
      Object.assign(this.responseHeaders, headers);
    }
  });
});

After(async function (this: CustomWorld, { result }) {
  // Take screenshot on failure
  if (result?.status === Status.FAILED) {
    try {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, 'image/png');
    } catch {
      // Page may already be closed
    }
  }

  await this.page?.close();
  await this.context?.close();
});

AfterAll(async () => {
  await sharedBrowser?.close();
});