describe('Create dataset', () => {
    before(() => {
        cy.login();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('cyToken');
        cy.login();
    });

    it('visits page', () => {
        cy.visit('/datasets');
    });
});
