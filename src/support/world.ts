import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from 'playwright';

export interface ICustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  baseUrl: string;
}

export class CustomWorld extends World implements ICustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  baseUrl: string = process.env.STRIPE_BASE_URL || 'https://dashboard.stripe.com';

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(): Promise<void> {
    const browserType = process.env.BROWSER || 'chromium';
    const headless = process.env.HEADLESS !== 'false';
    const slowMo = parseInt(process.env.SLOW_MO || '0', 10);

    let browserEngine;
    switch (browserType) {
      case 'firefox':
        browserEngine = firefox;
        break;
      case 'webkit':
        browserEngine = webkit;
        break;
      default:
        browserEngine = chromium;
    }

    this.browser = await browserEngine.launch({
      headless,
      slowMo,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: false,
      acceptDownloads: false
    });

    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(parseInt(process.env.TIMEOUT || '30000', 10));
  }

  async teardown(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);