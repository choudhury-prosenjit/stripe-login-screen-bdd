import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export interface ICustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  responseHeaders: Record<string, string>;
}

export class CustomWorld extends World implements ICustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  responseHeaders: Record<string, string> = {};

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);