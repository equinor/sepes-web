// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const _ = Cypress._;

import 'cypress-file-upload';

Cypress.Commands.add('login', (accessType = 'ADMIN') => {
    // const cyToken = '';
    // window.localStorage.setItem('cyToken', cyToken);
    window.localStorage.setItem('cyToken', Cypress.env('cyAccessToken'));
});

Cypress.Commands.add('createStudy', (studyName) => {
    cy.visit('/');

    cy.get('[data-cy=new_study]').click({ force: true });

    cy.get('[data-cy=study_name]').type(studyName);
    cy.get('[data-cy=study_vendor]').type('cy vendor');
    cy.get('[data-cy=study_wbs]').type('c.gbx.da.efc10');
    cy.get('[data-cy=study_description]').type('cy description');

    cy.get('[data-cy=create_study]').click({ force: true });
    cy.waitForStudyToLoad();
});

Cypress.Commands.add('createStudyWithLogo', (studyName) => {
    cy.visit('/');

    cy.get('[data-cy=new_study]').click({ force: true });
    cy.get('[data-cy=change_logo]').click();
    cy.get('[data-cy="logo_upload"]').attachFile('cypress.jpg');
    cy.get('[data-cy=study_name]').type(studyName);
    cy.get('[data-cy=study_vendor]').type('cy vendor');
    cy.get('[data-cy=study_wbs]').type('c.gbx.da.efc10');
    cy.get('[data-cy=study_description]').type('cy description');

    cy.get('[data-cy=create_study]').click({ force: true });
    cy.waitForStudyToLoad();
});

Cypress.Commands.add('createDataset', () => {
    cy.get('[data-cy=dataset_name]').type('cy name');
    cy.get('[data-cy=dataset_location]').click({ force: true });
    cy.contains('Norway East').click({ force: true });
    cy.get('[data-cy=dataset_classification]').click({ force: true });
    cy.contains('Open').click({ force: true });
    cy.get('[data-cy=dataset_dataId]').type(1);
    cy.get('[data-cy=dataset_save]').click({ force: true });
});

Cypress.Commands.add('deleteStudy', (studyName) => {
    cy.get('[data-cy=edit_study]').click({ force: true });
    cy.get('[data-cy=study_options]').click({ force: true });
    cy.get('[data-cy=study_delete]').click({ force: true });
    cy.get('[data-cy="delete_resource"]').type(studyName);
    cy.get('[data-cy=delete_resource_delete]').click({ force: true });
});

Cypress.Commands.add('waitForStudyToLoad', () => {
    cy.intercept('/api/studies/*').as('getStudy');
    cy.wait('@getStudy');
});

Cypress.Commands.add('waitForSandboxToLoad', () => {
    cy.intercept('/api/sandboxes/*').as('getSandbox');
    cy.wait('@getSandbox');
});

Cypress.Commands.add('waitForVirtualMachineToBeCreated', () => {
    cy.intercept('/api/virtualmachines/*').as('getVm');
    cy.wait('@getVm');
});

Cypress.Commands.add('createVm', () => {
    cy.waitForSandboxToLoad();
    cy.get('[data-cy=vm_name]').type('cy name');
    cy.get('[data-cy=vm_operatingSystem]').click({ force: true });
    cy.contains('Windows Server 2019 Datacenter').click({ force: true });
    cy.get('[data-cy=vm_username]').type('cy username');
    cy.get('[data-cy=vm_password]').type('Cypassword123!!');
    cy.get('[data-cy=vm_size]').click({ force: true });
    cy.contains('Standard_F1').click({ force: true });
    cy.get('[data-cy=vm_dataDisks]').click({ force: true });
    cy.contains('64 GB').click({ force: true });
    cy.get('[data-cy=create_vm]').click();
    cy.waitForVirtualMachineToBeCreated();
});

Cypress.Commands.add('createVmRules', () => {
    cy.wait(1500);
    cy.get('[data-cy=vm_add_rule]').click();
    cy.get('[data-cy=vm_rule_description]').type('cy rule description');
    cy.get('[data-cy=vm_rule_ip]').type('192.168.1.1');
    cy.get('[data-cy="vm_rule_protocol"]').click({ force: true });
    cy.contains('HTTP').click({ force: true });
    cy.get('[data-cy=vm_rule_save]').click({ force: true });
});

Cypress.Commands.add('deleteVm', (sandboxName) => {
    cy.get('[data-cy=vm_more_actions]').click({ force: true });
    cy.get('[data-cy="vm_delete"]').click({ force: true });
    cy.get('[data-cy="delete_resource"]').type('vm-cytitle-' + sandboxName + '-cyname');
    cy.get('[data-cy=delete_resource_delete]').click({ force: true });
});

Cypress.Commands.add('deleteSandbox', (sandboxName) => {
    cy.get('[data-cy=sandbox_more_options]').click({ force: true });
    cy.get('[data-cy=sandbox_delete]').click({ force: true });
    cy.get('[data-cy="delete_resource"]').type(sandboxName);
    cy.get('[data-cy=delete_resource_delete]').click({ force: true });
});

Cypress.Commands.add('createSandbox', (sandboxName) => {
    cy.get('[data-cy=sandbox_name]').type(sandboxName);
    cy.get('[data-cy=sandbox_region]').click({ force: true });
    cy.contains('Norway East').click({ force: true });
    cy.get('[data-cy=create_actual_sandbox]').click({ force: true });
});
