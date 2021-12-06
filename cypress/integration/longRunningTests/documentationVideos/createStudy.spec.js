/* eslint-disable no-undef */
describe('Create study', () => {
    const studyName = 'Study for documentation';
    before(() => {
        cy.login();
        cy.clearViewport();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('cyToken');
        cy.login();
    });

    it('Create study', { keystrokeDelay: 100 }, () => {
        cy.visit('/');
        cy.text('Now we will create a study', {
            duration: 2000, // how long the text should be there
            blocking: false, // wait for the text to hide
            textSize: '3vh' // CSS text height
        });
        cy.get('[data-cy=new_study]').arrow({
            text: 'Click create study to go to the create-study form',
            textSize: '3vh',
            blocking: true,
            duration: 5000
        });
        cy.get('[data-cy=new_study]').click({ force: true });

        cy.get('[data-cy=change_logo]').arrow({
            text: 'Here you can add a logo for your study',
            textSize: '3vh',
            blocking: true,
            duration: 5000
        });
        cy.get('[data-cy=change_logo]').click();
        cy.get('[data-cy="logo_upload"]').attachFile('cypress.jpg');

        cy.get('[data-cy=study_name]').arrow({
            text: 'Enter the name of the study',
            textSize: '3vh',
            blocking: true,
            pointAt: 'bottomRight',
            duration: 5000
        });

        cy.get('[data-cy=study_name]').type(studyName);

        cy.get('[data-cy=study_vendor]').arrow({
            text: 'Enter the name of the vendor of the study',
            textSize: '3vh',
            blocking: true,
            pointAt: 'bottomRight',
            duration: 5000
        });

        cy.get('[data-cy=study_vendor]').type('cy vendor');

        cy.get('[data-cy=study_wbs]').arrow({
            text: 'WBS - needed to create data sets and sandboxes',
            textSize: '3vh',
            blocking: true,
            pointAt: 'bottomRight',
            duration: 5000
        });

        cy.get('[data-cy=study_wbs]').type('Automatic_test_cost');
        cy.waitForWbsCheck();

        cy.get('[data-cy=study_description]').arrow({
            text: 'Description of the study',
            textSize: '3vh',
            blocking: true,
            duration: 5000
        });

        cy.get('[data-cy=study_description]').type('cy description');
        cy.wait(2000);

        cy.get('[data-cy=create_study]').arrow({
            text: 'Click create study when all required field are filled out',
            textSize: '3vh',
            blocking: true,
            duration: 5000
        });

        cy.get('[data-cy=create_study]').click({ force: true });
        cy.waitForStudyToLoad();

        // cy.createStudyWithLogo(studyName);
    });

    // it('Create study', { keystrokeDelay: 100 }, () => {
    //     cy.text('Now we will create a study', {
    //         duration: 5000, // how long the text should be there
    //         blocking: false, // wait for the text to hide
    //         textSize: '20pt' // CSS text height
    //     });
    //     cy.createStudyWithLogo(studyName);
    // });

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
        cy.text('Delete the study', {
            duration: 5000, // how long the text should be there
            blocking: true, // wait for the text to hide
            textSize: '20pt' // CSS text height
        });
        cy.deleteStudy(studyName);
    });
});
/* eslint-enable no-unused-vars */
