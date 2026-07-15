import { Page, Locator, expect } from '@playwright/test';

/**
 * LoginPage - Page Object Model for Stripe Dashboard Login
 * URL: https://dashboard.stripe.com/login
 *
 * XPath Locators sourced from live page inspection via Playwright.
 * Verified elements:
 *   - Email:     input#email  (type=email, name=email)
 *   - Password:  input#old-password (type=password, autocomplete=current-password)
 *   - Checkbox:  input[type="checkbox"]
 *   - Button:    button[type="submit"]
 *   - Links:     identified via visible text
 */
export class LoginPage {
  readonly page: Page;

  // ── Input Fields ───────────────────────────────────────────────────────────
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;

  // ── Buttons ────────────────────────────────────────────────────────────────
  readonly signInButton: Locator;

  // ── Navigation Links ───────────────────────────────────────────────────────
  readonly forgotPasswordLink: Locator;
  readonly signInWithGoogleLink: Locator;
  readonly signInWithPasskeyLink: Locator;
  readonly signInWithSSOLink: Locator;
  readonly createAccountLink: Locator;
  readonly privacyTermsLink: Locator;

  // ── Error / Status ─────────────────────────────────────────────────────────
  readonly errorMessage: Locator;
  readonly loadingState: Locator;

  constructor(page: Page) {
    this.page = page;

    // XPath locators — sourced from live Stripe login page inspection
    this.emailInput = page.locator('//*[@id="email"]');
    this.passwordInput = page.locator('//*[@id="old-password"]');
    this.rememberMeCheckbox = page.locator('//input[@type="checkbox"]');
    this.signInButton = page.locator('//button[@type="submit"]');

    this.forgotPasswordLink = page.locator('//a[contains(text(),"Forgot your password")]');
    this.signInWithGoogleLink = page.locator('//a[contains(text(),"Sign in with Google")]');
    this.signInWithPasskeyLink = page.locator('//a[contains(text(),"Sign in with passkey")]');
    this.signInWithSSOLink = page.locator('//a[contains(text(),"Sign in with SSO")]');
    this.createAccountLink = page.locator('//a[contains(text(),"Create account")]');
    this.privacyTermsLink = page.locator('//a[contains(text(),"Privacy")]');

    this.errorMessage = page.locator('//*[contains(@class,"error") or contains(@class,"Error") or contains(@role,"alert")]').first();
    this.loadingState = page.locator('//button[@type="submit"][contains(@class,"loading") or @disabled]');
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  async navigate(baseUrl: string = 'https://dashboard.stripe.com'): Promise<void> {
    await this.page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.signInButton.waitFor({ state: 'visible', timeout: 15000 });
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.click();
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async checkRememberMe(): Promise<void> {
    const checked = await this.rememberMeCheckbox.isChecked();
    if (!checked) {
      await this.rememberMeCheckbox.click();
    }
  }

  async uncheckRememberMe(): Promise<void> {
    const checked = await this.rememberMeCheckbox.isChecked();
    if (checked) {
      await this.rememberMeCheckbox.click();
    }
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async pressEnterOnPassword(): Promise<void> {
    await this.passwordInput.press('Enter');
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async clickSignInWithGoogle(): Promise<void> {
    await this.signInWithGoogleLink.click();
  }

  async clickSignInWithPasskey(): Promise<void> {
    await this.signInWithPasskeyLink.click();
  }

  async clickSignInWithSSO(): Promise<void> {
    await this.signInWithSSOLink.click();
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountLink.click();
  }

  async clickPrivacyTerms(): Promise<void> {
    await this.privacyTermsLink.click();
  }

  // ── Assertions ─────────────────────────────────────────────────────────────

  async assertOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*dashboard.stripe.com/login.*/);
    await expect(this.emailInput).toBeVisible();
  }

  async assertRedirectedToDashboard(): Promise<void> {
    await this.page.waitForURL(/.*dashboard.stripe.com(?!/login).*/,
      { timeout: 15000 });
  }

  async assertErrorVisible(): Promise<void> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 8000 });
    await expect(this.errorMessage).toBeVisible();
  }

  async assertPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async assertEmailInputType(): Promise<void> {
    const type = await this.emailInput.getAttribute('type');
    expect(type).toBe('email');
  }

  async assertPasswordInputType(): Promise<void> {
    const type = await this.passwordInput.getAttribute('type');
    expect(type).toBe('password');
  }

  async assertPasswordAutocomplete(): Promise<void> {
    const autocomplete = await this.passwordInput.getAttribute('autocomplete');
    expect(autocomplete).toBe('current-password');
  }

  async assertRememberMeChecked(): Promise<void> {
    await expect(this.rememberMeCheckbox).toBeChecked();
  }

  async assertRememberMeUnchecked(): Promise<void> {
    await expect(this.rememberMeCheckbox).not.toBeChecked();
  }

  async assertEmailFieldValue(email: string): Promise<void> {
    await expect(this.emailInput).toHaveValue(email);
  }

  async assertHTTPS(): Promise<void> {
    const url = this.page.url();
    expect(url.startsWith('https://')).toBeTruthy();
  }

  async assertURLContains(partial: string): Promise<void> {
    const url = this.page.url();
    expect(url).toContain(partial);
  }

  async assertURLNotContains(partial: string): Promise<void> {
    const url = this.page.url();
    expect(url).not.toContain(partial);
  }

  async setMobileViewport(): Promise<void> {
    await this.page.setViewportSize({ width: 375, height: 812 });
  }

  async getPageSource(): Promise<string> {
    return await this.page.content();
  }
}