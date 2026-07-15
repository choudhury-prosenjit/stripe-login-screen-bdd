import { Page, Locator, expect } from '@playwright/test';

/**
 * LoginPage - Page Object Model for https://dashboard.stripe.com/login
 * All XPath locators verified via live Playwright inspection.
 */
export class LoginPage {
  readonly page: Page;

  // ── Form inputs ─────────────────────────────────────────────────────────
  /** //*[@id="email"]  (aria-label="email input") */
  readonly emailInput: Locator;

  /** //*[@id="old-password"]  (aria-label="password input", autocomplete="current-password") */
  readonly passwordInput: Locator;

  /** //input[@type="checkbox"]  — "Remember me on this device" */
  readonly rememberMeCheckbox: Locator;

  /** //button[@type="submit"]  — primary "Sign in" CTA */
  readonly signInButton: Locator;

  // ── Alternative sign-in methods ──────────────────────────────────────────
  /** //*[@id="continue_with_google"]  — "Sign in with Google" */
  readonly googleSignInLink: Locator;

  /** //*[@id="toggle_passkey_mode"]  — "Sign in with passkey" */
  readonly passkeySignInLink: Locator;

  /** //*[@id="toggle_sso_mode"]  — "Sign in with SSO" */
  readonly ssoSignInLink: Locator;

  // ── Navigation links ─────────────────────────────────────────────────────
  /** //a[contains(@href,"reset")]  — "Forgot your password?" */
  readonly forgotPasswordLink: Locator;

  /** //a[contains(@href,"register")]  — "Create account" */
  readonly createAccountLink: Locator;

  /** //a[contains(@href,"privacy")]  — "Privacy & terms" */
  readonly privacyLink: Locator;

  /** //a[@href="https://stripe.com/"]  — Stripe logo / footer */
  readonly stripeLogoLink: Locator;

  // ── URLs ─────────────────────────────────────────────────────────────────
  static readonly LOGIN_URL    = process.env.BASE_URL     ?? 'https://dashboard.stripe.com/login';
  static readonly RESET_URL    = process.env.RESET_URL    ?? 'https://dashboard.stripe.com/reset';
  static readonly REGISTER_URL = process.env.REGISTER_URL ?? 'https://dashboard.stripe.com/register';
  static readonly PRIVACY_URL  = process.env.PRIVACY_URL  ?? 'https://stripe.com/privacy';
  static readonly DASHBOARD_URL = 'https://dashboard.stripe.com';

  constructor(page: Page) {
    this.page = page;

    // Use XPath locators fetched live from the page
    this.emailInput         = page.locator('//*[@id="email"]');
    this.passwordInput      = page.locator('//*[@id="old-password"]');
    this.rememberMeCheckbox = page.locator('//input[@type="checkbox"]');
    this.signInButton       = page.locator('//button[@type="submit"]');
    this.googleSignInLink   = page.locator('//*[@id="continue_with_google"]');
    this.passkeySignInLink  = page.locator('//*[@id="toggle_passkey_mode"]');
    this.ssoSignInLink      = page.locator('//*[@id="toggle_sso_mode"]');
    this.forgotPasswordLink = page.locator('//a[contains(@href,"reset")]');
    this.createAccountLink  = page.locator('//a[contains(@href,"register")]');
    this.privacyLink        = page.locator('//a[contains(@href,"privacy")]');
    this.stripeLogoLink     = page.locator('//a[@href="https://stripe.com/"]').first();
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.page.goto(LoginPage.LOGIN_URL, {
      waitUntil: 'networkidle',
      timeout: parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000'),
    });
    await this.waitForFormReady();
  }

  async waitForFormReady(): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.signInButton.waitFor({ state: 'visible', timeout: 15000 });
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async checkRememberMe(): Promise<void> {
    if (!(await this.rememberMeCheckbox.isChecked())) {
      await this.rememberMeCheckbox.click();
    }
  }

  async uncheckRememberMe(): Promise<void> {
    if (await this.rememberMeCheckbox.isChecked()) {
      await this.rememberMeCheckbox.click();
    }
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async login(email: string, password: string, rememberMe = false): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    if (rememberMe) {
      await this.checkRememberMe();
    }
    await this.clickSignIn();
  }

  async submitEmptyForm(): Promise<void> {
    await this.signInButton.click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountLink.click();
  }

  async clickPrivacyTerms(): Promise<void> {
    await this.privacyLink.click();
  }

  async clickGoogleSignIn(): Promise<void> {
    await this.googleSignInLink.click();
  }

  async clickPasskeySignIn(): Promise<void> {
    await this.passkeySignInLink.click();
  }

  async clickSsoSignIn(): Promise<void> {
    await this.ssoSignInLink.click();
  }

  async pressEnterInPasswordField(): Promise<void> {
    await this.passwordInput.press('Enter');
  }

  async pressTabInEmailField(): Promise<void> {
    await this.emailInput.press('Tab');
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async assertOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard\.stripe\.com\/login/);
    await expect(this.emailInput).toBeVisible();
  }

  async assertOnDashboard(): Promise<void> {
    await this.page.waitForURL(/dashboard\.stripe\.com(?!\/login)/, { timeout: 30000 });
  }

  async assertPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Stripe Login | Sign in to the Stripe Dashboard');
  }

  async assertAllUIElementsVisible(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.rememberMeCheckbox).toBeVisible();
    await expect(this.signInButton).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
    await expect(this.googleSignInLink).toBeVisible();
    await expect(this.passkeySignInLink).toBeVisible();
    await expect(this.ssoSignInLink).toBeVisible();
    await expect(this.createAccountLink).toBeVisible();
    await expect(this.privacyLink).toBeVisible();
    await expect(this.stripeLogoLink).toBeVisible();
  }

  async assertEmailFieldHasAccessibleLabel(): Promise<void> {
    const ariaLabel = await this.emailInput.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  }

  async assertPasswordFieldHasAccessibleLabel(): Promise<void> {
    const ariaLabel = await this.passwordInput.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  }

  async assertPasswordAutocompleteAttribute(): Promise<void> {
    const autocomplete = await this.passwordInput.getAttribute('autocomplete');
    expect(autocomplete).toBe('current-password');
  }

  async assertPasswordIsObscured(): Promise<void> {
    const inputType = await this.passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
  }

  async assertRememberMeIsChecked(): Promise<void> {
    await expect(this.rememberMeCheckbox).toBeChecked();
  }

  async assertRememberMeIsUnchecked(): Promise<void> {
    await expect(this.rememberMeCheckbox).not.toBeChecked();
  }

  async getErrorMessages(): Promise<string[]> {
    const errors = this.page.locator('[role="alert"], .error-message, [data-testid*="error"], .ErrorMessage');
    const count = await errors.count();
    const messages: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await errors.nth(i).textContent();
      if (text?.trim()) messages.push(text.trim());
    }
    return messages;
  }

  async assertErrorVisible(): Promise<void> {
    const errors = this.page.locator('[role="alert"], .error-message, [data-testid*="error"]');
    await expect(errors.first()).toBeVisible({ timeout: 5000 });
  }

  async assertCurrentUrl(expectedUrl: string): Promise<void> {
    await this.page.waitForURL(expectedUrl, { timeout: 15000 });
    expect(this.page.url()).toContain(expectedUrl);
  }

  async isHttpsEnforced(): Promise<boolean> {
    return this.page.url().startsWith('https://');
  }

  async getResponseHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {};
    this.page.on('response', (response) => {
      if (response.url().includes('dashboard.stripe.com/login')) {
        const h = response.headers();
        Object.assign(headers, h);
      }
    });
    await this.page.reload({ waitUntil: 'networkidle' });
    return headers;
  }
}