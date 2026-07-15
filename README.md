# Stripe Login Screen BDD Automation

A complete BDD test automation framework for the [Stripe Dashboard Login](https://dashboard.stripe.com/login) screen.

**Stack:** Cucumber 10 | Playwright 1.44 | TypeScript 5

---

## Project Structure

```
stripe-login-screen-bdd/
├── src/
│   ├── features/
│   │   ├── 01-happy-path.feature       # LOGIN-001 to LOGIN-009
│   │   ├── 02-validation.feature       # LOGIN-010 to LOGIN-019
│   │   ├── 03-navigation.feature       # LOGIN-020 to LOGIN-030
│   │   └── 04-security.feature         # LOGIN-031 to LOGIN-040
│   ├── pages/
│   │   └── LoginPage.ts                # Page Object Model
│   ├── step-definitions/
│   │   └── login.steps.ts              # All 40 step definitions
│   ├── hooks/
│   │   └── hooks.ts                    # Before/After hooks
│   └── support/
│       └── world.ts                    # Custom Cucumber World
├── .env.example
├── cucumber.config.js
├── package.json
└── tsconfig.json
```

---

## XPath Locators (from live page inspection)

| Element | XPath |
|---------|-------|
| Email Input | `//*[@id="email"]` |
| Password Input | `//*[@id="old-password"]` |
| Remember Me Checkbox | `//input[@type="checkbox"]` |
| Sign In Button | `//button[@type="submit"]` |
| Forgot Password Link | `//a[contains(text(),"Forgot your password")]` |
| Sign in with Google | `//a[contains(text(),"Sign in with Google")]` |
| Sign in with Passkey | `//a[contains(text(),"Sign in with passkey")]` |
| Sign in with SSO | `//a[contains(text(),"Sign in with SSO")]` |
| Create Account Link | `//a[contains(text(),"Create account")]` |
| Privacy & Terms | `//a[contains(text(),"Privacy")]` |

---

## Setup

```bash
npm install
npx playwright install chromium
cp .env.example .env
# Edit .env with your credentials
```

## Running Tests

```bash
npm test                     # Run all 40 scenarios
npm run test:happy           # Happy path only (@happy-path)
npm run test:validation      # Validation tests (@validation)
npm run test:navigation      # Navigation/UI tests (@navigation)
npm run test:security        # Security/PCI-DSS tests (@security)
```

## Test Coverage: 40 Scenarios

| Feature File | Tag | Count |
|---|---|---|
| 01-happy-path.feature | @happy-path | 9 |
| 02-validation.feature | @validation | 10 |
| 03-navigation.feature | @navigation | 11 |
| 04-security.feature | @security | 10 |
| **Total** | | **40** |

## License
MIT