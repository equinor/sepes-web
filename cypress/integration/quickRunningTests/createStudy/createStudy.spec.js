/* eslint-disable no-undef */
describe('Create study', () => {
    let studyName = 'Cypress Test';
    before(() => {
        cy.login();
        cy.createStudyWithLogo(studyName);
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('cyToken');
        cy.login();
    });

    it('clicks edit study', () => {
        cy.get('[data-cy=edit_study]').click({ force: true });
    });
    const editValue = ' edited';
    studyName = studyName.concat(editValue);
    it('fills out study information again', () => {
        cy.get('[data-cy=study_name]').clear().type(studyName);
        cy.get('[data-cy=study_vendor]').type('cy vendor edited');
        cy.get('[data-cy=study_wbs]').type('cy wbs edited');
        cy.get('[data-cy=study_description]').type('cy description edited');
    });

    it('clicks create new study', () => {
        cy.get('[data-cy=create_study]').click({ force: true });
    });

    it('Edit results and learnings', () => {
        cy.get('[data-cy=edit_results_and_learnings]').click({ force: true });
        cy.get('[data-cy=results_and_learnings]').type('cy Results and learnings');
        cy.get('[data-cy=save_results_and_learnings]').click({ force: true });
    });

    it('Add participant to study', () => {
        cy.get('[data-cy=participants_tab]').click({ force: true });
        cy.contains('Search or add').type('Mock User');
        cy.intercept('api/participants/*').as('getMockUser');
        cy.wait('@getMockUser');
        cy.focused().type('{enter}');
        cy.get('[data-cy=participant_role]').click();
        cy.contains('Vendor Admin').click();
        cy.get('[data-cy=study_add_participant]').click();
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

    it('fills out dataset information again (edit)', () => {
        cy.get('[data-cy=dataset_edit]').click({ force: true });
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

    it('Remove participant from study', () => {
        cy.get('[data-cy=participants_tab]').click({ force: true });
        cy.get('[data-cy=study_remove_participant]').click({ force: true });
    });

    it('Delete study', () => {
        cy.deleteStudy(studyName);
    });
});
/* eslint-enable no-unused-vars */
