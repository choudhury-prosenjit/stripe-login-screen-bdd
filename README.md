# Stripe Login Screen BDD Automation

> **Cucumber + Playwright + TypeScript** end-to-end test suite for the [Stripe Dashboard Login](https://dashboard.stripe.com/login) page — 40 scenarios across 4 feature files.

## Project Structure

```
stripe-login-screen-bdd/
├── src/
│   ├── features/
│   │   ├── 01-happy-path.feature       # LOGIN-001 to LOGIN-009
│   │   ├── 02-validation.feature       # LOGIN-010 to LOGIN-019
│   │   ├── 03-navigation.feature       # LOGIN-020 to LOGIN-030
│   │   └── 04-security.feature         # LOGIN-031 to LOGIN-040
│   ├── step-definitions/
│   │   ├── login.steps.ts
│   │   ├── navigation.steps.ts
│   │   └── security.steps.ts
│   ├── pages/
│   │   └── LoginPage.ts                # Page Object Model
│   ├── hooks/
│   │   └── hooks.ts                    # Before/After hooks
│   └── support/
│       └── world.ts                    # Custom Cucumber World
├── cucumber.config.js
├── tsconfig.json
├── package.json
└── .env.example
```

## Quick Start

```bash
npm install
npx playwright install chromium
cp .env.example .env
npm test
```

## Run by Tag

```bash
npm run test:happy       # @happy-path  – LOGIN-001 to LOGIN-009
npm run test:validation  # @validation  – LOGIN-010 to LOGIN-019
npm run test:navigation  # @navigation  – LOGIN-020 to LOGIN-030
npm run test:security    # @security    – LOGIN-031 to LOGIN-040
```

## Live XPath Locators (from https://dashboard.stripe.com/login)

| Element | XPath |
|---------|-------|
| Email input | `//*[@id="email"]` |
| Password input | `//*[@id="old-password"]` |
| Remember me checkbox | `//input[@type="checkbox"]` |
| Sign in button | `//button[@type="submit"]` |
| Forgot password | `//a[contains(@href,"reset")]` |
| Sign in with Google | `//*[@id="continue_with_google"]` |
| Sign in with Passkey | `//*[@id="toggle_passkey_mode"]` |
| Sign in with SSO | `//*[@id="toggle_sso_mode"]` |
| Create account | `//a[contains(@href,"register")]` |
| Privacy and terms | `//a[contains(@href,"privacy")]` |
| Stripe logo | `//a[@href="https://stripe.com/"]` |
