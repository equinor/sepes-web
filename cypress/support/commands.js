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
    cy.get('[data-cy=study_wbs]').type('cy wbs');
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
    cy.get('[data-cy=study_wbs]').type('cy wbs');
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
