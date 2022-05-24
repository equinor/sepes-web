describe('TopBar', () => {
    before(() => {
        cy.login();
        cy.visit('/');
    });

    it('displays sepes home link', () => {
        cy.get('[data-cy=home-link]').should('be.visible');
    });

    it('does not display environment message for MOCKUSER', () => {
        cy.get('[data-cy=environment-msg]').should('not.exist');
    });

    it('displays link to documentation', () => {
        cy.get('[data-cy=documentation-link]').should('be.visible');
    });

    it('displays feedback button and dialog', () => {
        // Open dialog
        const btn = cy.get('[data-cy=feedback-btn');
        btn.should('be.visible');
        btn.click();
        cy.get('[data-cy=feedback-dialog').should('be.visible');

        // Cancel dialog
        cy.get('[data-cy=feedback-cancel-btn').click();
    });

    before(() => {
        cy.mockOutPermissions();
    });

    it('displays top bar menu', () => {
        // Open menu
        const btn = cy.get('[data-cy=top-bar-menu-btn');
        btn.should('be.visible');
        btn.click();

        // Test user info item
        cy.get('[data-cy=top-bar-menu').should('be.visible');
        cy.get('[data-cy=top-bar-user-info')
            .children()
            .should('contain', 'mock@test.com')
            .and('contain', 'Admin')
            .and('contain', 'Sponsor')
            .and('contain', 'Dataset admin');
    });
});