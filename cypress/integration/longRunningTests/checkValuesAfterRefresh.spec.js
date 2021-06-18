/* eslint-disable no-undef */
describe('Check values after refresh', () => {
    let studyName = 'Cypress Test';
    before(() => {
        cy.login();
        cy.createStudy(studyName);
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('cyToken');
        cy.login();
    });

    it('Check if study values are saved', () => {
        cy.reload();
        cy.contains(studyName).should('be.visible');
        cy.contains('cy vendor').should('be.visible');
        cy.contains('Automatic_test_cost').should('be.visible');
    });

    it('Edit results and learnings', () => {
        cy.editResultsAndLearnings();
    });

    it('Check results and learnings is saved', () => {
        cy.wait(3000);
        cy.reload();
        cy.contains('cy Results and learnings').should('be.visible');
    });

    it('Add participant to study', () => {
        cy.addMockUserAsParticipant();
    });

    it('Check participants are saved', () => {
        cy.reload();
        cy.get('[data-cy=participants_tab]').click({ force: true });
        cy.contains('Mock User').should('be.visible');
        cy.contains('Vendor Admin').should('be.visible');
    });

    it.skip('Remove participant from study', () => {
        cy.get('[data-cy=study_remove_participant]').click({ force: true });
        cy.wait(3000);
        cy.reload();
        cy.contains('Vendor Admin').should('not.exist');
    });

    it('clicks on data sets tab', () => {
        cy.get('[data-cy=datasets_tab]').click({ force: true });
    });

    it('clicks add study specific dataset', () => {
        cy.get('[data-cy=add_study_specific_dataset]').click({ force: true });
    });

    it('fills out dataset information and create dataset', () => {
        cy.createDataset();
        cy.intercept('/api/studies/**').as('getDataset');
        cy.wait('@getDataset');
    });

    it('Check if data set is saved', () => {
        cy.reload();
        cy.contains('cy dataset name').should('be.visible');
    });

    it('Upload file to dataset', () => {
        cy.wait(100000);
        cy.get('[data-cy="file_upload"]').attachFile('example.json');
        cy.wait(20000);
    });

    it.skip('Check if file is saved', () => {
        cy.reload();
        cy.contains('example.json').should('be.visible');
    });

    it.skip('Remove file', () => {
        cy.get('[data-cy="dataset_remove_file"]').click({ force: true });
        cy.wait(10000);
    });

    it('Check if file is removed', () => {
        cy.reload();
        cy.contains('example.json').should('not.exist');
    });

    it('Delete study specific dataset', () => {
        cy.deleteDataset('cy dataset name');
        cy.waitForStudyToLoad();
    });

    it('Check that dataset is no longer in study', () => {
        cy.contains('cy dataset name').should('not.exist');
    });

    it('clicks sandbox tab', () => {
        cy.get('[data-cy=sandbox_tab]').click();
    });

    it('clicks create sandbox', () => {
        cy.wait(2000);
        cy.get('[data-cy=create_sandbox]').click();
    });
    const sandboxName = 'Cypress ' + Cypress._.random(0, 1e6);

    it('fills out sanbox information', () => {
        cy.createSandbox(sandboxName);
        cy.waitForSandboxToLoad();
    });

    it('Check if sanbox info is saved', () => {
        cy.reload();
        cy.waitForSandboxToLoad();
        cy.contains(sandboxName).should('be.visible');
    });

    it('delete sandbox', () => {
        cy.deleteSandbox(sandboxName);
    });

    it('Check that sandbox is gone from study', () => {
        cy.contains(sandboxName).should('not.exist');
    });

    it('delete study', () => {
        cy.deleteStudy(studyName);
    });

    it('Check that study is deleted', () => {
        cy.contains(studyName).should('not.exist');
    });
});
