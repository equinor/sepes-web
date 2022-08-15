describe('TopBar', () => {
    before(() => {
        cy.login();
        cy.visit('/');
        console.log(Cypress.env())
        cy.mockOutPermissions();
    });

    it('displays the correct information', () => {
        cy.get('[data-cy=home-link]').should('be.visible');
        cy.get('[data-cy=environment-msg]').should('not.exist');
        cy.get('[data-cy=documentation-link]').should('be.visible');

        // Open feedback dialog
        cy.get('[data-cy=feedback-btn]').should('be.visible').click();
        cy.get('[data-cy=feedback-dialog]').should('be.visible');

        // Cancel feedback dialog
        cy.get('[data-cy=feedback-cancel-btn]').click();

        
        // Open menu
        cy.get('[data-cy=top-bar-menu-btn]').should('be.visible').click();

        // Test user info item
        cy.get('[data-cy=top-bar-menu]').should('be.visible');
        cy.get('[data-cy=top-bar-user-info]')
            .children()
            .should('contain', 'mock@test.com')
            .and('contain', 'Admin')
            .and('contain', 'Sponsor')
            .and('contain', 'Dataset admin');
    });

});
