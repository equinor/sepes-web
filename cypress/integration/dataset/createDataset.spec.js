/* eslint-disable no-undef */
describe('Create dataset', () => {
    before(() => {
        cy.login();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('cyToken');
    });

    it('visits page', () => {
        cy.visit('/datasets');
    });

    it('clicks create new project not using the wizard', () => {
        cy.get('[data-cy=create_dataset]').click();
    });

    it('fills out dataset information', () => {
        cy.get('[data-cy=dataset_name]').type('cy name');
        cy.get('[data-cy=dataset_storage_name]').type('cy storage');
        cy.get('[data-cy=dataset_location]').click();
        cy.contains('Norway East').click();
        cy.get('[data-cy=dataset_classification]').click();
        cy.contains('Open').click();
        cy.get('[data-cy=dataset_dataId]').type(1);
        cy.get('[data-cy=dataset_save]').click();
        cy.get('[data-cy=dataset_edit]').click();
    });

    it('fills out dataset information again', () => {
        cy.get('[data-cy=dataset_name]').type('cy name edit');
        cy.get('[data-cy=dataset_classification]').click();
        cy.contains('Internal').click();
        cy.get('[data-cy=dataset_dataId]').type(2);
        cy.get('[data-cy=dataset_save]').click();
    });
});
