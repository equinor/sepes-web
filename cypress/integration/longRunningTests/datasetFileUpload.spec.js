/* eslint-disable no-undef */
describe('Dataset file upload', () => {
    let studyName = 'Cypress Test';
    before(() => {
        cy.login();
        cy.createStudy(studyName);
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('cyToken');
        cy.login();
    });

    it('clicks on data sets tab', () => {
        cy.get('[data-cy=datasets_tab]').click({ force: true });
    });

    it('clicks add study specific dataset', () => {
        cy.get('[data-cy=add_study_specific_dataset]').click({ force: true });
    });

    it('fills out dataset information and create dataset', () => {
        cy.createDataset();
    });

    it('Upload file to dataset', () => {
        cy.wait(120000);
        cy.get('[data-cy="file_upload"]').attachFile('cypress.jpg');
        cy.wait(20000);
    });

    it('Remove file', () => {
        cy.get('[data-cy="dataset_remove_file"]').click({ force: true });
        cy.wait(10000);
    });

    it('Delete study specific dataset', () => {
        cy.get('[data-cy=dataset_delete]').click({ force: true });
        cy.get('[data-cy="delete_resource"]').type('cy dataset name');
        cy.get('[data-cy=delete_resource_delete]').click({ force: true });
    });

    it('Delete study', () => {
        cy.deleteStudy(studyName);
    });
});
