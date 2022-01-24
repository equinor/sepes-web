/* eslint-disable no-undef */
describe('Create sandbox and virtual machine', () => {
    const studyName = 'Study for documentation';
    before(() => {
        cy.login();
        cy.clearViewport();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('cyToken');
        cy.login();
        cy.mockOutAllCallsForCreateSandboxAndVirtualmachineDocsTest();
    });

    it('Create initial study', () => {
        cy.visit('/');
        cy.text('Step 1 - First, create a study if you do not have one already', {
            duration: 4000,
            blocking: true,
            textSize: '3vh'
        });
        cy.createStudyWithoutInterceptingStudy(studyName);
    });

    it('clicks on sandboxes tab', () => {
        cy.text('Step 2 - Click on the sandboxes tab', {
            duration: 3000,
            blocking: false,
            textSize: '3vh'
        });
        cy.get('[data-cy=sandbox_tab]').arrow({
            text: 'Click here to change tab to sandboxes overview',
            textSize: '3vh',
            blocking: true,
            pointAt: 'bottomRight',
            duration: 5000
        });
        cy.switchToSandboxesTab();
    });

    const sandboxName = 'Docs sandbox 99';

    it('clicks create sandbox', () => {
        cy.mockOutSandbox();
        cy.text('Step 3 - Click on the create sandbox button', {
            duration: 3000,
            blocking: false,
            textSize: '3vh'
        });
        cy.get('[data-cy=create_sandbox]').arrow({
            text: 'Click create sandbox',
            textSize: '3vh',
            blocking: true,
            duration: 5000
        });
        cy.get('[data-cy=create_sandbox]').click();
        cy.get('[data-cy=sandbox_name]').arrow({
            text: 'Enter a name for the sandbox. Can not be changed later',
            textSize: '3vh',
            blocking: true,
            duration: 5000
        });
        cy.get('[data-cy=sandbox_name]').type(sandboxName);
        cy.get('[data-cy=sandbox_region]').arrow({
            text: 'Enter the region for the sandbox. Can not be changed later',
            textSize: '3vh',
            blocking: true,
            duration: 5000
        });
        cy.get('[data-cy=sandbox_region]').click({ force: true });
        cy.contains('Norway East').click({ force: true });
        cy.get('[data-cy=create_actual_sandbox]').arrow({
            text: 'Click create!',
            textSize: '3vh',
            blocking: true,
            duration: 5000
        });
        cy.get('[data-cy=create_actual_sandbox]').click({ force: true });

        cy.text('You are now on your newly created sandbox!', {
            duration: 5000,
            blocking: true,
            textSize: '3vh'
        });
    });

    it('Create vm', { keystrokeDelay: 100 }, () => {
        cy.text('Step 6 - Create VM', {
            duration: 3000,
            blocking: false,
            textSize: '3vh'
        });
        cy.get('[data-cy=vm_name]').arrow({
            text: 'Enter vm name. Can not be changed later',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight',
            color: 'green'
        });
        cy.get('[data-cy=vm_name]').type('cy name');
        // cy.get('[data-cy=vm_operatingSystem]').click({ force: true });
        cy.get('[data-cy=vm_operatingSystem]').arrow({
            text: 'Choose vm operating system',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });
        cy.get('[data-cy=vm_operatingSystem]').type('Windows Server Datacenter Core 2019 (17763.2114.2108051826)');
        cy.contains('Windows Server Datacenter Core 2019 (17763.2114.2108051826)').click({ force: true });

        cy.get('[data-cy=vm_username]').arrow({
            text: 'Choose a username for the vm',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });
        cy.get('[data-cy=vm_username]').type('cy username');
        cy.get('[data-cy=vm_password]').arrow({
            text: 'Choose a password for the vm',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });
        cy.get('[data-cy=vm_password]').type('Cypassword123!!');
        // cy.get('[data-cy=vm_size]').click({ force: true });
        cy.get('[data-cy=vm_size]').arrow({
            text: 'Choose a size for the vm. This effects cost',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });
        cy.get('[data-cy=vm_size]').type('Standard_F1');
        cy.contains('Standard_F1').click({ force: true });
        cy.get('[data-cy=vm_dataDisks]').arrow({
            text: 'Choose a disk size for the vm. This effects cost',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });
        cy.get('[data-cy=vm_dataDisks]').click({ force: true });
        cy.contains('4 GB').click({ force: true });

        cy.get('[data-cy=create_vm]').arrow({
            text: 'When all required fields are filled out. Click create',
            textSize: '3vh',
            blocking: true,
            duration: 5000,
            pointAt: 'bottomRight'
        });
        cy.get('[data-cy=create_vm]').click();
        cy.text('You are now on your newly created virtual machine!', {
            duration: 5000,
            blocking: true,
            textSize: '3vh'
        });
        cy.get('[data-cy=sandbox_resources]').arrow({
            text: 'Here you can see status of the resources in this sandbox',
            textSize: '3vh',
            blocking: true,
            duration: 5000
        });
        cy.get('[data-cy=sandbox_resources]').arrow({
            text: 'You have to wait until the VM is ready to connect to it',
            textSize: '3vh',
            blocking: true,
            duration: 5000
        });
    });

    it('Delete sandbox', { keystrokeDelay: 100 }, () => {
        cy.text('Delete the sandbox', {
            duration: 5000,
            blocking: true,
            textSize: '3vh'
        });
        cy.deleteSandbox(sandboxName);
    });

    it('Delete study', { keystrokeDelay: 100 }, () => {
        cy.mockOutStudyList();
        cy.text('Delete the study', {
            duration: 5000,
            blocking: true,
            textSize: '3vh'
        });
        cy.deleteStudy(studyName);
    });
});
/* eslint-enable no-unused-vars */
