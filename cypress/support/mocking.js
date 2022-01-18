const _ = Cypress._;

Cypress.Commands.add('mockOutStudyList', () => {
    cy.intercept('/api/studies', { fixture: 'study/emptyStudyList.json' });
});
Cypress.Commands.add('mockOutStudy', () => {
    cy.intercept('/api/studies/', { fixture: 'study/study.json' });
    cy.intercept('/api/studies/*', { fixture: 'study/study.json' });
});

Cypress.Commands.add('mockOutDeleteStudy', () => {
    cy.intercept('/api/studies/*/close', { fixture: 'emptyResponse.json' });
});
Cypress.Commands.add('mockOutResultsAndLearnings', () => {
    cy.intercept('/api/studies/*/resultsandlearnings', { fixture: 'study/emptyResultsAndLearnings.json' });
});
Cypress.Commands.add('mockOutPermissions', () => {
    cy.intercept('/api/permissions', { fixture: 'rbac/admin/permissions.json' });
});

// Data set mocks

Cypress.Commands.add('mockOutDataSet', () => {
    cy.intercept('/api/studies/*/datasets/*', { fixture: 'dataset/dataset.json' });
});
Cypress.Commands.add('mockOutDataSetDelete', () => {
    cy.intercept('/api/studies/datasets/studyspecific/*', { fixture: 'emptyResponse.json' });
});

Cypress.Commands.add('mockOutRegions', () => {
    cy.intercept('/api/regions', {
        fixture: 'common/regions.json'
    });
});

Cypress.Commands.add('mockOutDatasetResources', () => {
    cy.intercept('/api/studies/*/datasets/*/resources', {
        fixture: 'dataset/resources.json'
    });
});

// Sandbox mocks

Cypress.Commands.add('mockOutAllSandboxCalls', () => {
    cy.mockOutSandbox();
    cy.mockOutSandboxPost();
    cy.mockOutAvailableDataset();
    cy.mockOutVmSizes();
    cy.mockOutVmDisks();
    cy.mockOutVmOperatingsystems();
    cy.mockOutSandboxResources();
    cy.mockOutSandboxCostAnalysis();
    cy.mockOutRegions();
});

Cypress.Commands.add('mockOutSandbox', () => {
    cy.intercept('/api/sandboxes/*', {
        fixture: 'sandbox/sandbox.json'
    });
});

Cypress.Commands.add('mockOutSandboxPost', () => {
    cy.intercept('/api/sandboxes/', {
        fixture: 'sandbox/sandbox.json'
    });
});

Cypress.Commands.add('mockOutAvailableDataset', () => {
    cy.intercept('/api/sandbox/*/availabledatasets', { fixture: 'emptyResponse.json' });
});

Cypress.Commands.add('mockOutVmSizes', () => {
    cy.intercept('/api/virtualmachines/2747/sizes', {
        fixture: 'sandbox/vmSizes.json'
    });
});

Cypress.Commands.add('mockOutVmDisks', () => {
    cy.intercept('/api/virtualmachines/2747/disks', {
        fixture: 'sandbox/vmDisks.json'
    });
});

Cypress.Commands.add('mockOutVmOperatingsystems', () => {
    cy.intercept('/api/virtualmachines/2747/disks', {
        fixture: 'sandbox/vmOperatingsystems.json'
    });
});

Cypress.Commands.add('mockOutSandboxResources', () => {
    cy.intercept('/api/sandboxes/*/resources', {
        fixture: 'sandbox/sandboxResources.json'
    });
});

Cypress.Commands.add('mockOutSandboxCostAnalysis', () => {
    cy.intercept('/api/sandboxes/2779/costanalysis');
});
