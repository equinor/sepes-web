/* eslint-disable no-undef */
describe('Create vm', () => {
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
    // });
    // it('clicks create new project not using the wizard', () => {
    //     cy.get('[data-cy=new_study]').click({ force: true });
    // });
    // it('fills out study information', () => {
    //     cy.get('[data-cy=study_name]').type(studyName);
    //     cy.get('[data-cy=study_vendor]').type('cy vendor');
    //     cy.get('[data-cy=study_wbs]').type('cy wbs');
    //     cy.get('[data-cy=study_description]').type('cy description');
    // });

    // it('clicks create new study', () => {
    //     cy.get('[data-cy=create_study]').click({ force: true });
    //     cy.wait(2000);
    // });

    it('clicks on data sets tab', () => {
        cy.get('[data-cy=datasets_tab]').click({ force: true });
    });

    it('clicks add study specific dataset', () => {
        cy.wait(2000);
        cy.get('[data-cy=add_study_specific_dataset]').click({ force: true });
    });

    it('fills out dataset information', () => {
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
        cy.get('[data-cy=dataset_back_to_study]').click({ force: true });
    });
    it('clicks sandbox tab', () => {
        cy.wait(2000);
        cy.get('[data-cy=sandbox_tab]').click({ force: true });
    });

    it('clicks sandbox', () => {
        cy.wait(2000);
        cy.get('[data-cy=create_sandbox]').click({ force: true });
    });
    const sandboxName = Cypress._.random(0, 1e6);

    it('fills out sanbox information', () => {
        cy.get('[data-cy=sandbox_name]').type(sandboxName);
        cy.get('[data-cy=sandbox_region]').click({ force: true });
        cy.contains('Norway East').click({ force: true });
        cy.get('[data-cy=create_actual_sandbox]').click({ force: true });
    });

    it('fills out vm information', () => {
        cy.wait(5000);
        cy.get('[data-cy=vm_name]').type('cy name');
        cy.get('[data-cy=vm_operatingSystem]').click({ force: true });
        cy.contains('Windows Server 2019 Datacenter').click({ force: true });
        cy.get('[data-cy=vm_username]').type('cy username');
        cy.get('[data-cy=vm_password]').type('Cypassword123!!');
        cy.get('[data-cy=vm_size]').click({ force: true });
        cy.contains('Standard_F1').click({ force: true });

        cy.get('[data-cy=vm_dataDisks]').click({ force: true });
        cy.contains('64 GB').click({ force: true });
        cy.wait(3000);
        cy.get('[data-cy=create_vm]').click();
        cy.wait(3000);
    });

    it('creates VM rules', () => {
        cy.wait(1000);
        cy.get('[data-cy=vm_add_rule]').click();
        cy.wait(1000);
        cy.get('[data-cy=vm_rule_description]').type('cy rule description');
        cy.get('[data-cy=vm_rule_ip]').type('192.168.1.1');

        cy.get('[data-cy="vm_rule_protocol"]').click({ force: true });
        cy.contains('HTTP').click({ force: true });

        cy.get('[data-cy=vm_rule_save]').click({ force: true });
    });

    it('add data set to sandbox', () => {
        cy.get('[data-cy=add_dataset_to_sandbox]').click({ force: true });
        cy.wait(1000);
    });

    it('delete vm', () => {
        cy.get('[data-cy=vm_more_actions]').click({ force: true });
        cy.get('[data-cy="vm_delete"]').click({ force: true });
        cy.get('[data-cy="delete_resource"]').type('vm-cytitle-' + sandboxName + '-cyname');
        cy.get('[data-cy=delete_resource_delete]').click({ force: true });
        cy.wait(1000);
    });

    it('delete sandbox', () => {
        cy.get('[data-cy=sandbox_more_options]').click({ force: true });
        cy.get('[data-cy=sandbox_delete]').click({ force: true });
        cy.get('[data-cy="delete_resource"]').type(sandboxName);
        cy.get('[data-cy=delete_resource_delete]').click({ force: true });
    });
    it('delete study', () => {
        cy.get('[data-cy=edit_study]').click({ force: true });
        cy.get('[data-cy=study_options]').click({ force: true });
        cy.get('[data-cy=study_delete]').click({ force: true });
        cy.get('[data-cy="delete_resource"]').type(studyName);
        cy.get('[data-cy=delete_resource_delete]').click({ force: true });
    });
});
