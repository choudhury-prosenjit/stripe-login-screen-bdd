@navigation
Feature: Stripe Dashboard Login - UI Elements and Navigation
  As a user visiting the Stripe login page
  I want all UI elements to be present, accessible, and functional
  So that I can navigate and interact with the page effectively

  Background:
    Given I navigate to the Stripe login page
    And the login page has fully loaded

  @LOGIN-020
  Scenario: Login page displays all required UI elements
    Then the Email input field should be visible and enabled
    And the Password input field should be visible and enabled
    And the Remember me on this device checkbox should be visible
    And the Sign in submit button should be visible and enabled
    And the Forgot your password link should be visible
    And the Sign in with Google option should be visible
    And the Sign in with passkey option should be visible
    And the Sign in with SSO option should be visible
    And the Create account link should be visible
    And the Privacy and terms link should be visible

  @LOGIN-021
  Scenario: Page title is correct
    Then the browser tab title should be "Stripe Login | Sign in to the Stripe Dashboard"

  @LOGIN-022
  Scenario: Forgot your password link navigates to password reset page
    When I click the Forgot your password link
    Then I should be navigated to the Stripe password reset page

  @LOGIN-023
  Scenario: Create account link navigates to registration page
    When I click the Create account link
    Then I should be navigated to the Stripe registration page

  @LOGIN-024
  Scenario: Privacy and terms link navigates to privacy policy page
    When I click the Privacy and terms link
    Then I should be navigated to the Stripe privacy policy page

  @LOGIN-025
  Scenario: Tab key navigates through form fields in correct order
    Given I focus on the Email input field
    When I press the Tab key
    Then focus should move to the Password field
    When I press the Tab key
    Then focus should move to the next interactive element

  @LOGIN-026
  Scenario: Login form can be submitted by pressing Enter in Password field
    When I enter "user@example.com" in the Email field
    And I enter the correct password "ValidPass123!" in the Password field
    And I press Enter key in the Password field
    Then the form should be submitted

  @LOGIN-027
  Scenario: Remember me checkbox is toggleable
    Given the Remember me checkbox is unchecked by default
    When I click the Remember me on this device checkbox
    Then the checkbox should become checked
    When I click the Remember me on this device checkbox again
    Then the checkbox should become unchecked

  @LOGIN-028
  Scenario: Email field accepts valid email input
    When I click on the Email input field
    And I type "testuser@example.com" into the Email field
    Then the Email field should contain "testuser@example.com"

  @LOGIN-029
  Scenario: Login page elements are accessible with proper attributes
    Then the Email field should have an associated label
    And the Password field should have an associated label
    And the Sign in button should have accessible text
    And form fields should have appropriate ARIA attributes

  @LOGIN-030
  Scenario: Login page renders correctly on mobile viewport
    Given I resize the browser to mobile viewport dimensions
    Then all login form elements should be visible and usable
    And the Sign in button should be fully visible