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
    
    it('fills out study information', () => {
        cy.get('[data-cy=study_name]')
            .type('cy Title')
        cy.get('[data-cy=study_vendor]')
            .type('cy vendor')
        cy.get('[data-cy=study_wbs]')
            .type('cy wbs')
        cy.get('[data-cy=study_description]')
            .type('cy description')
    });

    it('clicks create new project not using the wizard', () => {
        cy.get('[data-cy=create_study]')
            .click();
    });