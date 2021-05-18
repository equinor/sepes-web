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
    cy.intercept('/api/studies/*').as('getStudy');
    //cy.wait(2000);
    cy.wait('@getStudy');
});
