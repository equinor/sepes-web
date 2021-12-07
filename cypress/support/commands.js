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
    cy.get('[data-cy=study_wbs]').type('Automatic_test_cost');
    cy.waitForWbsCheck();
    cy.get('[data-cy=study_description]').type('cy description');
    cy.wait(2000);
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
    cy.get('[data-cy=study_wbs]').type('Automatic_test_cost');
    cy.waitForWbsCheck();
    cy.get('[data-cy=study_description]').type('cy description');
    cy.wait(2000);
    cy.get('[data-cy=create_study]').click({ force: true });
    cy.waitForStudyToLoad();
});

Cypress.Commands.add('createStudyWithoutInterceptingStudy', (studyName) => {
    cy.visit('/');

    cy.get('[data-cy=new_study]').click({ force: true });

    cy.get('[data-cy=study_name]').type(studyName);
    cy.get('[data-cy=study_vendor]').type('cy vendor');
    cy.get('[data-cy=study_wbs]').type('Automatic_test_cost');
    cy.waitForWbsCheck();
    cy.get('[data-cy=study_description]').type('cy description');
    cy.wait(2000);
    cy.get('[data-cy=create_study]').click({ force: true });
});

Cypress.Commands.add('createDataset', () => {
    cy.get('[data-cy=dataset_name]').type('cy dataset name');
    cy.get('[data-cy=dataset_location]').click({ force: true });
    cy.contains('Norway East').click({ force: true });
    cy.get('[data-cy=dataset_classification]').click({ force: true });
    cy.contains('Open').click({ force: true });
    cy.get('[data-cy=dataset_dataId]').type(1);
    cy.get('[data-cy=dataset_save]').click({ force: true });
});

Cypress.Commands.add('deleteDataset', (datasetName) => {
    cy.get('[data-cy=dataset_delete]').click({ force: true });
    cy.get('[data-cy="delete_resource"]').type(datasetName);
    cy.get('[data-cy=delete_resource_delete]').click({ force: true });
});

Cypress.Commands.add('deleteStudy', (studyName) => {
    cy.get('[data-cy=edit_study]').click({ force: true });
    cy.get('[data-cy=study_options]').click({ force: true });
    cy.get('[data-cy=study_delete]').click({ force: true });
    cy.get('[data-cy="delete_resource"]').type(studyName);
    cy.get('[data-cy=delete_resource_delete]').click({ force: true });
});

Cypress.Commands.add('waitForStudyToLoad', () => {
    cy.intercept('/api/studies/*', (req) => {
        req.on('response', (res) => {
            // this will be called after all `before:response` handlers and after the `req.continue` handler
            // but before the response is sent to the browser
            res.body.wbsCodeValid = true;
        });
    }).as('getStudy');
    cy.wait('@getStudy');
});

Cypress.Commands.add('waitForSandboxToLoad', () => {
    cy.intercept('/api/sandboxes/**').as('getSandbox');
    cy.wait('@getSandbox');
});

Cypress.Commands.add('waitForWbsCheck', () => {
    cy.intercept('/api/wbsvalidation/*', 'true');
    // cy.wait('@checkWbs');
});

Cypress.Commands.add('waitForVirtualMachineToBeCreated', () => {
    cy.intercept('/api/virtualmachines/*').as('getVm');
    cy.wait('@getVm');
});

Cypress.Commands.add('createVm', () => {
    // cy.waitForSandboxToLoad();
    cy.get('[data-cy=vm_name]').type('cy name');
    // cy.get('[data-cy=vm_operatingSystem]').click({ force: true });
    cy.get('[data-cy=vm_operatingSystem]').type('Windows Server Datacenter Core 2019 (17763.2114.2108051826)');
    cy.contains('Windows Server Datacenter Core 2019 (17763.2114.2108051826)').click({ force: true });
    cy.get('[data-cy=vm_username]').type('cy username');
    cy.get('[data-cy=vm_password]').type('Cypassword123!!');
    // cy.get('[data-cy=vm_size]').click({ force: true });
    cy.get('[data-cy=vm_size]').type('Standard_F1');
    cy.contains('Standard_F1').click({ force: true });
    cy.get('[data-cy=vm_dataDisks]').click({ force: true });
    cy.contains('4 GB').click({ force: true });
    cy.get('[data-cy=create_vm]').click();
    cy.waitForVirtualMachineToBeCreated();
});

Cypress.Commands.add('createVmRules', () => {
    cy.wait(8000);
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

Cypress.Commands.add('editResultsAndLearnings', () => {
    cy.get('[data-cy=edit_results_and_learnings]').click({ force: true });
    cy.get('[data-cy=results_and_learnings]').type('cy Results and learnings');
    cy.get('[data-cy=save_results_and_learnings]').click({ force: true });
});

Cypress.Commands.add('addMockUserAsParticipant', () => {
    cy.get('[data-cy=participants_tab]').click({ force: true });
    cy.intercept('api/participants/*').as('getMockUser');
    cy.intercept('api/studies/*/participants/*').as('addParticipantRequest');
    cy.contains('Type minimum three chara').type('Mock User');

    cy.wait('@getMockUser');
    cy.focused().type('{enter}');
    cy.get('[data-cy=participant_role]').click({ force: true });
    cy.contains('Vendor Admin').click({ force: true });
    cy.get('[data-cy=study_add_participant]').click({ force: true });
    cy.wait('@addParticipantRequest');
});

Cypress.Commands.add('switchToParticipantsTab', () => {
    cy.get('[data-cy=participants_tab]').click({ force: true });
});

Cypress.Commands.add('switchToDatasetsTab', () => {
    cy.get('[data-cy=datasets_tab]').click({ force: true });
});

Cypress.Commands.add('switchToSandboxesTab', () => {
    cy.get('[data-cy=sandbox_tab]').click();
});

Cypress.Commands.add('switchToParticipantsTab', () => {
    cy.get('[data-cy=participants_tab]').click({ force: true });
});

Cypress.Commands.add('refreshPage', () => {
    cy.location('href', { log: false }).then((url) => {
        cy.visit(url, {
            onBeforeLoad: (win) => (win.fetch = null)
        });
    });
});

Cypress.Commands.add('isNotActionable', function (selector, done) {
    cy.get(selector).click({ force: true });
    cy.once('fail', (err) => {
        expect(err.message).to.include('cy.click() failed because this element');
        expect(err.message).to.include('is being covered by another element');
        done();
    });
    cy.get('#button-covered-in-span')
        .click()
        .then((x) => {
            done(new Error('Expected element NOT to be clickable, but click() succeeded'));
        });
});

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorageCache', () => {
    Object.keys(localStorage).forEach((key) => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add('restoreLocalStorageCache', () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

Cypress.Commands.add('clearViewport', () => {
    const runnerContainer = window.parent.document.getElementsByClassName('iframes-container')[0];
    runnerContainer.setAttribute('style', 'left: 0; top: 0; width: 100%; height: 100%;');

    const sizeContainer = window.parent.document.getElementsByClassName('size-container')[0];
    sizeContainer.setAttribute('style', '');

    const sidebar = window.parent.document.getElementsByClassName('reporter-wrap')[0];
    sidebar.setAttribute('style', 'opacity: 0');

    const header = window.parent.document.querySelector('.runner.container header');
    header.setAttribute('style', 'opacity: 0');
});
