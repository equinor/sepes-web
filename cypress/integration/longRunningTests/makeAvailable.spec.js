/* eslint-disable no-undef */
describe('Make available', () => {
    const studyName = 'Cypress Test';
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
        //cy.wait(2000);
        cy.get('[data-cy=add_study_specific_dataset]').click({ force: true });
    });

    it('fills out dataset information', () => {
        cy.createDataset();
        cy.get('[data-cy=dataset_back_to_study]').click({ force: true });
        // cy.waitForStudyToLoad();
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
    });

    it('fills out vm information', () => {
        cy.createVm();
    });

    it('creates VM rules', () => {
        cy.createVmRules();
    });

    it('add data set to sandbox', () => {
        cy.get('[data-cy=add_dataset_to_sandbox]').click();
    });

    it('Click Make available', () => {
        cy.wait(750000);
        cy.get('[data-cy=sandbox_make_available]').click({ force: true });
        cy.get('[data-cy=Sure_to_procceed_yes]').click({ force: true });
        cy.wait(20000);
    });

    it('delete vm', () => {
        cy.deleteVm(sandboxName);
    });

    it('delete sandbox', () => {
        cy.deleteSandbox(sandboxName);
    });
    it('delete study', () => {
        cy.deleteStudy(studyName);
    });
});
