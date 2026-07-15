@happy-path
Feature: Stripe Dashboard Login - Happy Path Authentication
  As a registered Stripe user
  I want to sign in to the Stripe Dashboard
  So that I can manage my payments, customers, and business operations

  Background:
    Given I navigate to the Stripe login page
    And the login form is fully loaded and visible

  @LOGIN-001
  Scenario: Successful login with valid email and password
    Given I am a registered Stripe account holder
    When I enter a valid registered email "user@example.com" in the Email field
    And I enter the correct password "ValidPass123!" in the Password field
    And I click the Sign in button
    Then I should be redirected to the Stripe Dashboard

  @LOGIN-002
  Scenario: Successful login with Remember Me checked persists session
    Given I am a registered Stripe account holder
    When I enter a valid registered email "user@example.com" in the Email field
    And I enter the correct password "ValidPass123!" in the Password field
    And I check the Remember me on this device checkbox
    And I click the Sign in button
    Then I should be redirected to the Stripe Dashboard
    And my session should be remembered on this device

  @LOGIN-003
  Scenario: Session not persisted when Remember Me is unchecked
    Given I am a registered Stripe account holder
    When I enter a valid registered email "user@example.com" in the Email field
    And I enter the correct password "ValidPass123!" in the Password field
    And the Remember me checkbox is unchecked by default
    And I click the Sign in button
    Then I should be redirected to the Stripe Dashboard

  @LOGIN-004
  Scenario: Successful login using email with uppercase characters
    Given I am a registered Stripe account holder
    When I enter "User@Example.COM" in the Email field
    And I enter the correct password "ValidPass123!" in the Password field
    And I click the Sign in button
    Then I should be redirected to the Stripe Dashboard

  @LOGIN-005
  Scenario: Successful login with email containing plus addressing
    Given I am a registered Stripe account holder
    When I enter "user+test@example.com" in the Email field
    And I enter the correct password "ValidPass123!" in the Password field
    And I click the Sign in button
    Then I should be redirected to the Stripe Dashboard

  @LOGIN-006
  Scenario: Successful sign-in with Google OAuth
    Given I am a registered Stripe user who linked their Google account
    When I click the Sign in with Google link
    Then I should be redirected to Google OAuth consent page

  @LOGIN-007
  Scenario: Successful sign-in with SSO
    Given I belong to an organization with SSO configured in Stripe
    When I click the Sign in with SSO link
    Then I should see the SSO domain entry prompt

  @LOGIN-008
  Scenario: Successful sign-in with passkey
    Given I am a registered Stripe user with a passkey configured
    When I click the Sign in with passkey link
    Then the browser passkey authentication prompt should appear

  @LOGIN-009
  Scenario: Login form submitted by pressing Enter key
    Given I am a registered Stripe account holder
    When I enter a valid registered email "user@example.com" in the Email field
    And I enter the correct password "ValidPass123!" in the Password field
    And I press Enter key in the Password field
    Then I should be redirected to the Stripe Dashboard