let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

describe('Login Test', function () {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Logs in the user', function () {
    // Navigate to the login page
    cy.visit('http://localhost:3000/auth');

    // Click the "Login" button to open the login form
    cy.get('button[value="login"]').click();

    // Type into the email input field
    cy.get('[data-testid=login-email-input]').type('v@noroff.no');

    // Type into the password input field
    cy.get('[data-testid=login-password-input]').type('vforvenue');

    // Click the submit button to log in
    cy.get('[data-testid=login-submit-button]').click();

    // Check that the local storage now contains an access token
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'accessToken')
      .should('be.a', 'string')
      .and('have.length.gt', 0);
  });

  it('Logs out the user', function () {
    cy.visit('http://localhost:3000');
    cy.wait(2000);
    // Click on the profile button to open the dropdown
    cy.get('[data-testid=profile-button]').click();

    // Wait for the dropdown to become visible
    cy.get('[data-testid=logout-button]').should('be.visible');

    // Click the logout button
    cy.get('[data-testid=logout-button]').click();

    // Check that the local storage no longer contains an access token
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'accessToken')
      .should('be.null');
  });
});
