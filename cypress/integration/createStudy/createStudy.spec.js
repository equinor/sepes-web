/* eslint-disable no-undef */
describe('Create study', () => {
    const studyName = 'Cypress Test';
    before(() => {
        cy.login();
        cy.createStudy(studyName);
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('cyToken');
        cy.login();
    });

    // it('visits page', () => {
    //     cy.visit('/');
    //     cy.get('[data-cy=new_study]').should('be.visible');
    // });

    // it('clicks create new project not using the wizard', () => {
    //     cy.get('[data-cy=new_study]').click({ force: true });
    // });
    // it('fills out study information', () => {
    //     cy.get('[data-cy=study_name]').type('Cypress Test');
    //     cy.get('[data-cy=study_vendor]').type('cy vendor');
    //     cy.get('[data-cy=study_wbs]').type('cy wbs');
    //     cy.get('[data-cy=study_description]').type('cy description');
    // });

    // it('clicks create new study', () => {
    //     cy.get('[data-cy=create_study]').click({ force: true });
    //     cy.wait(2000);
    // });

    it('clicks edit study', () => {
        cy.get('[data-cy=edit_study]').click({ force: true });
    });

    it('fills out study information again', () => {
        cy.get('[data-cy=study_name]').type('Cypress Test edited');
        cy.get('[data-cy=study_vendor]').type('cy vendor edited');
        cy.get('[data-cy=study_wbs]').type('cy wbs edited');
        cy.get('[data-cy=study_description]').type('cy description edited');
    });

    it('clicks create new study', () => {
        cy.get('[data-cy=create_study]').click({ force: true });
    });

    it('clicks edit results and learnings', () => {
        cy.get('[data-cy=edit_results_and_learnings]').click({ force: true });
    });

    it('fills out study information again', () => {
        cy.get('[data-cy=results_and_learnings]').type('cy Results and learnings');
    });

    it('clicks save results and learnings', () => {
        cy.get('[data-cy=save_results_and_learnings]').click({ force: true });
        cy.wait(500);
    });

    it('clicks on data sets tab', () => {
        cy.get('[data-cy=datasets_tab]').click({ force: true });
    });

    it('clicks add study specific dataset', () => {
        cy.get('[data-cy=add_study_specific_dataset]').click({ force: true });
    });

    it('fills out dataset information and create dataset', () => {
        cy.get('[data-cy=dataset_name]').type('cy name');
        /*
            cy.get('[data-cy=dataset_storage_name]')
                .type('cy storage')
                */
        cy.get('[data-cy=dataset_location]').click({ force: true });
        cy.contains('Norway East').click({ force: true });
        cy.get('[data-cy=dataset_classification]').click({ force: true });
        cy.contains('Open').click({ force: true });
        cy.get('[data-cy=dataset_dataId]').type(1);
        cy.get('[data-cy=dataset_save]').click({ force: true });
        cy.wait(2000);
        cy.get('[data-cy=dataset_edit]').click({ force: true });
    });

    it('fills out dataset information again (edit)', () => {
        cy.get('[data-cy=dataset_name]').type('cy name edit');
        cy.get('[data-cy=dataset_classification]').click({ force: true });
        cy.contains('Internal').click({ force: true });
        cy.get('[data-cy=dataset_dataId]').type(2);
        cy.get('[data-cy=dataset_save]').click({ force: true });
    });

    it('Delete study specific dataset', () => {
        cy.get('[data-cy=dataset_delete]').click({ force: true });
        cy.get('[data-cy="delete_resource"]').type('cy namecy name edit');
        cy.get('[data-cy=delete_resource_delete]').click({ force: true });
    });

    it('Delete study', () => {
        cy.get('[data-cy=edit_study]').click({ force: true });
        cy.get('[data-cy=study_options]').click({ force: true });
        cy.get('[data-cy=study_delete]').click({ force: true });
        cy.get('[data-cy="delete_resource"]').type('studyNamecy Title edited');
        cy.get('[data-cy=delete_resource_delete]').click({ force: true });
    });
});
/* eslint-enable no-unused-vars */
