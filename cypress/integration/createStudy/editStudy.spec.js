describe('Create study', function () {
    before(() => {
        cy.login();
    });

    beforeEach(function () {
        Cypress.Cookies.preserveOnce('cyToken');
    });

    it('visits page', () => {
        cy.visit('/');
    });

    it('clicks create new project not using the wizard', () => {
        cy.get('[data-cy=new_study]')
            .click();
    });
