/* eslint-disable no-undef */
describe('Create study', () => {
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
        cy.wait(40000);
        // cy.get('[data-cy="file_upload"]').attachFile('example.json');

        cy.fixture('example.json', 'base64').then((content) => {
            cy.get('[data-cy=file_upload]').upload(content, 'example.json');
        });
        cy.wait(10000);
    });