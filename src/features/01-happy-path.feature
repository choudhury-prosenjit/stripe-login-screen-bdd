@happy-path
Feature: Stripe Dashboard Login - Happy Path Authentication
  As a registered Stripe user
  I want to sign in to the Stripe Dashboard
  So that I can manage my payments, customers, and business operations

  Background:
    Given I navigate to the Stripe login page
    And the login form is fully loaded and visible

  @smoke @LOGIN-001
  Scenario: Successful login with valid email and password
    Given I am a registered Stripe account holder
    When I enter a valid registered email "user@example.com" in the Email field
    And I enter the correct password in the Password field
    And I click the Sign in button
    Then I should be redirected to the Stripe Dashboard home page

  @LOGIN-002
  Scenario: Successful login with Remember me checked - session persists
    Given I am a registered Stripe account holder
    When I enter a valid registered email "user@example.com" in the Email field
    And I enter the correct password in the Password field
    And I check the Remember me on this device checkbox
    And I click the Sign in button
    Then I should be redirected to the Stripe Dashboard
    And my session should be remembered on this device

  @LOGIN-003
  Scenario: Successful login without Remember me - session not persisted
    Given I am a registered Stripe account holder
    When I enter a valid registered email "user@example.com" in the Email field
    And I enter the correct password in the Password field
    And the Remember me on this device checkbox is unchecked
    And I click the Sign in button
    Then I should be redirected to the Stripe Dashboard
    And my session should not be persisted beyond this browser session

  @LOGIN-004
  Scenario: Successful login with email in uppercase characters
    Given I am a registered Stripe account holder
    When I enter "USER@EXAMPLE.COM" in the Email field
    And I enter the correct password in the Password field
    And I click the Sign in button
    Then I should be redirected to the Stripe Dashboard
    And login should succeed because email matching is case-insensitive

  @LOGIN-005
  Scenario: Successful login with email containing a plus sign in local part
    Given I am a registered Stripe account holder with email "user+test@example.com"
    When I enter "user+test@example.com" in the Email field
    And I enter the correct password in the Password field
    And I click the Sign in button
    Then I should be redirected to the Stripe Dashboard

  @smoke @LOGIN-006
  Scenario: Successful sign-in with Google OAuth
    Given I am a registered Stripe user who linked their Google account
    When I click the Sign in with Google option
    Then I should be redirected to the Google OAuth consent page
    And after completing Google authentication I should land on the Stripe Dashboard

  @LOGIN-007
  Scenario: Successful sign-in with SSO
    Given I belong to an organization with SSO configured in Stripe
    When I click the Sign in with SSO option
    Then I should be redirected to my organization identity provider
    And after completing IdP authentication I should land on the Stripe Dashboard

  @LOGIN-008
  Scenario: Successful sign-in with passkey
    Given I am a registered Stripe user with a passkey configured
    When I click the Sign in with passkey option
    Then the browser should prompt for passkey or biometric authentication
    And after successful passkey verification I should land on the Stripe Dashboard

  @LOGIN-009
  Scenario: Successful login when switching between multiple Stripe accounts
    Given I have previously logged out of a Stripe account
    And I navigate to the Stripe login page
    When I enter credentials for a different registered Stripe account
    And I click the Sign in button
    Then I should be authenticated under the new account
    And the dashboard should display the new account data