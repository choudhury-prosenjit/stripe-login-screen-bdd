@validation
Feature: Stripe Dashboard Login - Field Validation and Error Handling
  As a user attempting to log in to the Stripe Dashboard
  I want to see clear and helpful error messages
  So that I understand why my login attempt failed and how to correct it

  Background:
    Given I navigate to the Stripe login page
    And the login form is fully loaded

  @smoke @LOGIN-010
  Scenario: Error shown when submitting with both fields empty
    Given all fields are empty
    When I click the Sign in button without entering any credentials
    Then an error message should appear indicating the Email field is required
    And the form should not be submitted
    And I should remain on the login page

  @LOGIN-011
  Scenario: Error shown for invalid email format - missing domain
    When I enter "notanemail" in the Email field
    And I attempt to submit the form
    Then a validation error should appear indicating an invalid email format

  @LOGIN-012
  Scenario: Error shown for email with missing domain after at-sign
    When I enter "user@" in the Email field
    And I attempt to submit the form
    Then an email format validation error should be displayed

  @LOGIN-013
  Scenario: Error shown for email missing the at-sign
    When I enter "userexample.com" in the Email field
    And I attempt to submit the form
    Then a browser-native or inline validation error should appear for invalid email format

  @LOGIN-014
  Scenario: Error shown when password field is empty
    When I enter a valid email "user@example.com" in the Email field
    And I leave the Password field empty
    And I click the Sign in button
    Then an error should be shown indicating the password is required
    And the form should not be submitted

  @smoke @LOGIN-015
  Scenario: Error shown for incorrect password
    Given I am a registered Stripe account holder
    When I enter a valid registered email "user@example.com" in the Email field
    And I enter an incorrect password "WrongPassword123" in the Password field
    And I click the Sign in button
    Then an error message should be displayed indicating invalid credentials
    And I should remain on the login page

  @LOGIN-016
  Scenario: Error shown for unregistered email address
    When I enter an unregistered email "nonexistent@example.com" in the Email field
    And I enter any password in the Password field
    And I click the Sign in button
    Then an error message should be displayed
    And the message should not reveal whether the email exists or not

  @security @LOGIN-017
  Scenario: Account locked after multiple consecutive failed login attempts
    Given I am on the Stripe login page
    When I enter the email "user@example.com" in the Email field
    And I enter an incorrect password 5 consecutive times
    Then my account should be temporarily locked or rate-limited
    And an appropriate lockout message should be displayed

  @LOGIN-018
  Scenario: Password field obscures characters by default
    When I click into the Password field
    And I type any characters in the Password field
    Then the characters should be masked and not visible as plain text

  @security @LOGIN-019
  Scenario: Error message is generic and does not reveal account existence
    When I enter "unknownuser@stripe.com" in the Email field
    And I enter any password in the Password field
    And I click the Sign in button
    Then the error message should not say Email not found or Account does not exist
    And the message should be generic such as Invalid email or password