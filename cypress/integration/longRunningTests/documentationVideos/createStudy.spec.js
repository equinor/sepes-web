/* eslint-disable no-undef */
describe('Create study', () => {
    const studyName = 'Study for documentation';
    before(() => {
        cy.clearViewport();
        cy.login();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('cyToken');
        cy.login();
    });

    it('Create study', { keystrokeDelay: 100 }, () => {
        cy.createStudyWithLogo(studyName);
    });

    // it('clicks edit study', () => {
    //     cy.get('[data-cy=edit_study]').click({ force: true });
    // });
    // const editValue = ' edited';
    // studyName = studyName.concat(editValue);
    // it('fills out study information again', () => {
    //     cy.get('[data-cy=study_name]').clear().type(studyName);
    //     cy.get('[data-cy=study_vendor]').type('cy vendor edited');
    //     cy.get('[data-cy=study_description]').type('cy description edited');
    // });

    // it('clicks create new study', () => {
    //     cy.get('[data-cy=create_study]').click({ force: true });
    // });

    // it('Edit results and learnings', () => {
    //     cy.editResultsAndLearnings();
    // });

    // it('Add participant to study', () => {
    //     cy.addMockUserAsParticipant();
    // });

    // it('clicks on data sets tab', () => {
    //     cy.switchToDatasetsTab();
    // });

    // it('clicks add study specific dataset', () => {
    //     cy.get('[data-cy=add_study_specific_dataset]').click({ force: true });
    // });

    // it('fills out dataset information and create dataset', () => {
    //     cy.createDataset();
    // });

    // it('fills out dataset information again (edit)', () => {
    //     cy.get('[data-cy=dataset_edit]').click({ force: true });
    //     cy.get('[data-cy=dataset_name]').type('cy name edit');
    //     cy.get('[data-cy=dataset_classification]').click({ force: true });
    //     cy.contains('Internal').click({ force: true });
    //     cy.get('[data-cy=dataset_dataId]').type(2);
    //     cy.get('[data-cy=dataset_save]').click({ force: true });
    // });

    // it('Delete study specific dataset', () => {
    //     cy.get('[data-cy=dataset_delete]').click({ force: true });
    //     cy.get('[data-cy="delete_resource"]').type('cy dataset namecy name edit');
    //     cy.get('[data-cy=delete_resource_delete]').click({ force: true });
    // });

    // it('Remove participant from study', () => {
    //     cy.switchToParticipantsTab();
    //     cy.get('[data-cy=study_remove_participant]').click({ force: true });
    // });

    it('Delete study', () => {
        cy.deleteStudy(studyName);
    });
});
/* eslint-enable no-unused-vars */
