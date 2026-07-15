@security
Feature: Stripe Dashboard Login - Security and PCI-DSS Compliance
  As a Stripe platform responsible for PCI-DSS compliance
  I want the login page to enforce strict security controls
  So that user credentials and sessions are protected at all times

  Background:
    Given I navigate to the Stripe login page

  @smoke @pci-dss @LOGIN-031
  Scenario: Login page enforces HTTPS connection
    When I access the login URL over HTTP
    Then the browser should automatically redirect to HTTPS
    And the connection should be secured with TLS
    And a valid SSL certificate should be present

  @LOGIN-032
  Scenario: Password field autocomplete is set to current-password
    Then the Password input field should have the autocomplete attribute set to "current-password"
    And this should allow password managers to function correctly

  @pci-dss @LOGIN-033
  Scenario: No sensitive credentials appear in browser URL
    When I submit the login form with any credentials
    Then the email and password should not appear in the page URL
    And credentials should not appear in browser history as URL parameters

  @pci-dss @LOGIN-034
  Scenario: Session token is issued as an HttpOnly and Secure cookie
    When I successfully log in with valid credentials
    Then the session cookie should have the HttpOnly flag set
    And the session cookie should have the Secure flag set
    And the cookie should not be accessible via JavaScript

  @pci-dss @LOGIN-035
  Scenario: CSRF protection is present on the login form
    Then the login form should contain a CSRF protection mechanism
    And the token should be validated server-side on form submission

  @pci-dss @LOGIN-036
  Scenario: Login page does not log or expose entered passwords
    Given the browser developer tools network tab is monitored
    When I type a password in the Password field
    And I submit the form
    Then no password value should appear in the browser console logs
    And no password value should appear in plaintext in any network request payload

  @pci-dss @LOGIN-037
  Scenario: Content Security Policy headers are set on the login page
    When the login page response headers are inspected
    Then a Content-Security-Policy header should be present
    And it should restrict unauthorized script sources

  @smoke @pci-dss @LOGIN-038
  Scenario: Multi-Factor Authentication is triggered after valid credentials
    Given I am a Stripe user with MFA enabled on my account
    When I enter valid email and password
    And I click the Sign in button
    Then I should be prompted for a second authentication factor
    And I should not be logged in until MFA verification is complete

  @pci-dss @LOGIN-039
  Scenario: Brute force protection - rate limiting after rapid failed attempts
    When I submit invalid credentials more than 5 times in rapid succession
    Then the server should respond with a rate-limit error
    And subsequent login attempts should be throttled or blocked temporarily

  @pci-dss @LOGIN-040
  Scenario: Login page does not expose technology stack in response headers
    When the HTTP response headers for the login page are inspected
    Then sensitive headers such as Server or X-Powered-By should not reveal technology details
    And security headers such as X-Frame-Options and X-Content-Type-Options should be present