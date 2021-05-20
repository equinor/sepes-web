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
    const cyToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJlOTBjYmI2MS04OTZlLTRlYzctYWEzNy0yMzUxMTcwMGUxZWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwL3YyLjAiLCJpYXQiOjE2MjE1MDM5MTcsIm5iZiI6MTYyMTUwMzkxNywiZXhwIjoxNjIxNTA3ODE3LCJhaW8iOiJBVFFBeS84VEFBQUF6TXd1cy9MbXdMVGUvSG8raml6TXVOWFBpU2dwODliMjNCMEd2b3BRdGNPaS9ESXpzMWJtUXlCd09VRlJxV0tNIiwiYXpwIjoiZTkwY2JiNjEtODk2ZS00ZWM3LWFhMzctMjM1MTE3MDBlMWVkIiwiYXpwYWNyIjoiMCIsImVtYWlsIjoiSEFOT0xAZXF1aW5vci5jb20iLCJuYW1lIjoiSGFucyBLcmlzdGlhbiBWaWsgT2xzZW4iLCJvaWQiOiI3NjIxMDZlZS04YmRhLTQyYjQtOGQ4YS01MzdiMDdiY2FiMDEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJIQU5PTEBlcXVpbm9yLmNvbSIsInJoIjoiMC5BUUlBTmFLa091SzIxVWlSbFhfUEJiUlpzR0c3RE9sdWljZE9xamNqVVJjQTRlMENBSTguIiwicm9sZXMiOlsiU2VwZXMtU3BvbnNvciIsIlNlcGVzLUFkbWluIiwiU2VwZXMtRW1wbG95ZWUiXSwic2NwIjoiVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwgVXNlci5JbXBlcnNvbmF0aW9uIiwic3ViIjoiOWdGVVZKRlI3WlkwWmxxQ2R5Wk1hZ0pWY3l1WWNfMVJUa2h4QVVCNUsxSSIsInRpZCI6IjNhYTRhMjM1LWI2ZTItNDhkNS05MTk1LTdmY2YwNWI0NTliMCIsInVwbiI6IkhBTk9MQGVxdWlub3IuY29tIiwidXRpIjoiMEtSMVYxX0JJa0tpeEt3elJtRlZBQSIsInZlciI6IjIuMCJ9.jasL5J_3HzlG33yE7LVvYPEOe1KALLUvh7V0aYmZPHL6QZZmNawWVXVGFfq_D28gQMfWsVA0KLkpcZfocnipEjGhM4yKHF7CPKVeoaytCKT_nX9JvtE_dGI0t2BEeoVyjQrYAJ5CMsC-snSnaiwoxUEya8eCZ1ndGu3cvHka3BkV4o5Iu7pkxgWPGomshgkBjmbgvlfqumNntOyfmvASZljpbeKA9_MvfiG3u_-e8s1VlxItspviPGw4S3ZUHDiYVKWq43vj4VMWV962bG_mF_8L2ExVsOqd8a030aLK-dwb4HWO6FsZlenVEy8kOuPpq9NWKQ-BYtHqZ43BlqdeHQ';
    window.localStorage.setItem('cyToken', cyToken);
    // window.localStorage.setItem('cyToken', Cypress.env('cyAccessToken'));
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
