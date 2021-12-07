/* eslint-disable no-undef */
describe('Create data set', () => {
    const studyName = 'Study for documentation';
    before(() => {
        cy.login();
        cy.clearViewport();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('cyToken');
        cy.login();
    });

    it('Create initial study', () => {
        cy.visit('/');
        cy.text('Step 1 - First, create a study if you do not have one already', {
            duration: 4000,
            blocking: true,
            textSize: '3vh'
        });
        cy.createStudy(studyName);
    });

    it('clicks on data sets tab', () => {
        cy.text('Step 2 - Click on the data sets tab', {
            duration: 3000,
            blocking: false,
            textSize: '3vh'
        });
        cy.get('[data-cy=datasets_tab]').arrow({
            text: 'Click here to change tab to data sets overview',
            textSize: '3vh',
            blocking: true,
            pointAt: 'bottomRight',
            duration: 5000
        });
        cy.switchToDatasetsTab();
    });

    it('clicks add study specific data set', () => {
        cy.text('Step 3 - Click on the create study specific data set button', {
            duration: 3000,
            blocking: false,
            textSize: '3vh'
        });
        cy.get('[data-cy=add_study_specific_dataset]').arrow({
            text: 'Click here to create study specific data set',
            textSize: '3vh',
            blocking: true,
            duration: 5000
        });
        cy.get('[data-cy=add_study_specific_dataset]').click({ force: true });
    });

    it('Create dataset', { keystrokeDelay: 100 }, () => {
        // cy.createDataset();
        cy.text('Step 4 - Fill out the fields to create the data set', {
            duration: 3000,
            blocking: false,
            textSize: '3vh',
            pointAt: 'bottomRight'
        });
        cy.get('[data-cy=dataset_name]').arrow({
            text: 'Enter a name for the data set. Can be changed later',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });
        cy.get('[data-cy=dataset_name]').type('cy dataset name');
        cy.get('[data-cy=dataset_location]').arrow({
            text: 'Choose a data set location for the data set',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });
        cy.get('[data-cy=dataset_location]').click({ force: true });
        cy.contains('Norway East').click({ force: true });
        cy.get('[data-cy=dataset_classification]').arrow({
            text: 'Choose a classification for the data set',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });
        cy.get('[data-cy=dataset_classification]').click({ force: true });
        cy.contains('Open').click({ force: true });

        cy.get('[data-cy=dataset_dataId]').arrow({
            text: 'Enter a data id if you have one',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });

        cy.get('[data-cy=dataset_dataId]').type(1);
        cy.get('[data-cy=dataset_save]').arrow({
            text: 'Click save! ',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });
        cy.get('[data-cy=dataset_save]').click({ force: true });
        cy.text('You should now be on your newly created data set!', {
            duration: 5000,
            blocking: true,
            textSize: '3vh'
        });

        cy.get('[data-cy=storage_account_status]').arrow({
            text: 'View status of azure storage account',
            textSize: '3vh',
            blocking: true,
            duration: 3000
        });
        cy.get('[data-cy=storage_account_status]').arrow({
            text: 'You can upload files when this is finished',
            textSize: '3vh',
            blocking: true,
            duration: 3000
        });
        cy.get('[data-cy=file_upload_check]').arrow({
            text: 'Here you can upload files when it is ready',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });
    });

    it('Delete study specific data set', { keystrokeDelay: 100 }, () => {
        cy.text('How to delete the data set', {
            duration: 5000,
            blocking: true,
            textSize: '3vh'
        });
        cy.get('[data-cy=dataset_delete]').click({ force: true });
        cy.get('[data-cy="delete_resource"]').type('cy dataset name');
        cy.get('[data-cy=delete_resource_delete]').click({ force: true });
    });

    it('Delete study', { keystrokeDelay: 100 }, () => {
        cy.text('Delete the study', {
            duration: 5000,
            blocking: true,
            textSize: '3vh'
        });
        cy.deleteStudy(studyName);
    });
});
/* eslint-enable no-unused-vars */
