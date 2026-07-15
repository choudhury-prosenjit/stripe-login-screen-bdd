@security
Feature: Stripe Dashboard Login - Security and Compliance
  As a Stripe platform responsible for security
  I want the login page to enforce strict security controls
  So that user credentials and sessions are protected at all times

  Background:
    Given I navigate to the Stripe login page

  @LOGIN-031
  Scenario: Login page enforces HTTPS connection
    Then the current page URL should use HTTPS protocol
    And the connection should be secured with TLS

  @LOGIN-032
  Scenario: Password field has correct autocomplete attribute
    Then the Password input field should have autocomplete set to "current-password"

  @LOGIN-033
  Scenario: Credentials do not appear in browser URL after login attempt
    When I enter "user@example.com" in the Email field
    And I enter "TestPass123!" in the Password field
    And I click the Sign in button
    Then the page URL should not contain any credential parameters

  @LOGIN-034
  Scenario: Password field type is set to password for masking
    Then the Password input field type should be "password"
    And characters entered should be masked

  @LOGIN-035
  Scenario: Email field has correct input type for validation
    Then the Email input field type should be "email"

  @LOGIN-036
  Scenario: Login page does not expose password in page source
    When I view the page source
    Then the Password field value should not be visible in page source

  @LOGIN-037
  Scenario: Login page title identifies the application correctly
    Then the page title should contain "Stripe"
    And the page title should contain "Login"

  @LOGIN-038
  Scenario: MFA prompt appears after valid credentials for MFA-enabled account
    Given I am a Stripe user with MFA enabled on my account
    When I enter valid MFA-enabled email "mfa-user@example.com" in the Email field
    And I enter the correct MFA account password "MFAPass123!" in the Password field
    And I click the Sign in button
    Then I should be prompted for a second authentication factor

  @LOGIN-039
  Scenario: Sign in button is disabled or shows loading state after click
    When I enter "user@example.com" in the Email field
    And I enter "TestPass123!" in the Password field
    And I click the Sign in button
    Then the Sign in button should show a loading or processing state

  @LOGIN-040
  Scenario: Login page URL is on stripe.com domain
    Then the page URL should contain "dashboard.stripe.com"
    And the page URL should contain "login"