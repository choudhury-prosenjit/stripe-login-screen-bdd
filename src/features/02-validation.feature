@validation
Feature: Stripe Dashboard Login - Field Validation and Error Handling
  As a user attempting to log in to the Stripe Dashboard
  I want to see clear and helpful error messages
  So that I understand why my login attempt failed

  Background:
    Given I navigate to the Stripe login page
    And the login form is fully loaded

  @LOGIN-010
  Scenario: Error shown when submitting empty form
    Given all fields are empty
    When I click the Sign in button
    Then an error message should be displayed
    And I should remain on the login page

  @LOGIN-011
  Scenario: Error shown for invalid email format - no domain
    When I enter "notanemail" in the Email field
    And I click the Sign in button
    Then a validation error should appear for invalid email format

  @LOGIN-012
  Scenario: Error shown for email with missing domain extension
    When I enter "user@" in the Email field
    And I click the Sign in button
    Then a validation error should appear for invalid email format

  @LOGIN-013
  Scenario: Error shown for email with missing at symbol
    When I enter "userexample.com" in the Email field
    And I click the Sign in button
    Then a validation error should appear for invalid email format

  @LOGIN-014
  Scenario: Error shown when password is empty but email is valid
    When I enter "user@example.com" in the Email field
    And I leave the Password field empty
    And I click the Sign in button
    Then an error should be shown indicating password is required

  @LOGIN-015
  Scenario: Error shown for incorrect password with valid email
    Given I am a registered Stripe account holder
    When I enter a valid registered email "user@example.com" in the Email field
    And I enter an incorrect password "WrongPassword123!" in the Password field
    And I click the Sign in button
    Then an error message should indicate invalid credentials
    And I should remain on the login page

  @LOGIN-016
  Scenario: Error shown for unregistered email address
    When I enter an unregistered email "nonexistent99@example.com" in the Email field
    And I enter any password "AnyPassword123!" in the Password field
    And I click the Sign in button
    Then an error message should be displayed
    And the message should not reveal whether the email exists

  @LOGIN-017
  Scenario: Account rate-limited after multiple failed login attempts
    Given I am on the Stripe login page
    When I enter "user@example.com" in the Email field
    And I enter wrong password "WrongPass!" and submit 5 times consecutively
    Then the account should be temporarily rate-limited
    And a rate limit message should appear

  @LOGIN-018
  Scenario: Password field obscures characters by default
    When I click into the Password field
    And I type "MySecretPassword" in the Password field
    Then the password characters should be hidden

  @LOGIN-019
  Scenario: Error message is generic and does not reveal account existence
    When I enter "unknownuser@domain.com" in the Email field
    And I enter "SomePassword123!" in the Password field
    And I click the Sign in button
    Then the error message should be generic
    And it should not say "Email not found" or "Account does not exist"