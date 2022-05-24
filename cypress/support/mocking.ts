const _ = Cypress._;

Cypress.Commands.add('commonStudyMocks', () => {
    cy.mockOutStudyList();
    cy.mockOutStudy();
    cy.mockOutDeleteStudy();
    cy.mockOutResultsAndLearnings();
    cy.mockOutPermissions();
});

// Study mocks

Cypress.Commands.add('mockOutStudyList', () => {
    cy.intercept('/api/studies', { fixture: 'study/emptyStudyList.json' });
});
Cypress.Commands.add('mockOutStudy', () => {
    cy.intercept('/api/studies/', { fixture: 'study/study.json' });
    cy.intercept('/api/studies/*', { fixture: 'study/study.json' });
});

Cypress.Commands.add('mockOutDeleteStudy', () => {
    cy.intercept('/api/studies/*/close', { fixture: 'common/emptyResponse.json' });
});
Cypress.Commands.add('mockOutResultsAndLearnings', () => {
    cy.intercept('/api/studies/*/resultsandlearnings', { fixture: 'study/emptyResultsAndLearnings.json' });
});
Cypress.Commands.add('mockOutPermissions', () => {
    cy.intercept('/api/permissions', { fixture: 'rbac/admin/permissions.json' });
});
Cypress.Commands.add('mockOutStudyParticipant', () => {
    cy.intercept('api/participants/*', { fixture: 'study/studyParticipant.json' });
});
Cypress.Commands.add('mockOutAvailableRoles', () => {
    cy.intercept('api/studies/*/availableroles', { fixture: 'study/availableRoles.json' });
});
// Data set mocks

Cypress.Commands.add('mockOutAllCallsForCreateDatasetDocsTest', () => {
    cy.commonStudyMocks();
    cy.mockOutDatasetResources();
    cy.mockOutRegions();
    cy.mockOutDataSet();
    cy.mockOutDatasetResources();
    cy.mockOutDataSetDelete();
});

Cypress.Commands.add('mockOutDataSet', () => {
    cy.intercept('/api/studies/*/datasets/*', { fixture: 'dataset/dataset.json' });
    cy.intercept('/api/studies/*/datasetsstudyspecific', { fixture: 'dataset/dataset.json' });
});
Cypress.Commands.add('mockOutDataSetDelete', () => {
    cy.intercept('/api/studies/datasets/studyspecific/*', { fixture: 'common/emptyResponse.json' });
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

Cypress.Commands.add('mockOutAllCallsForCreateSandboxAndVirtualmachineDocsTest', () => {
    cy.commonStudyMocks();
    cy.mockOutSandbox();
    cy.mockOutAvailableDataset();
    cy.mockOutVmSizes();
    cy.mockOutVmDisks();
    cy.mockOutVmOperatingSystems();
    cy.mockOutSandboxResources();
    cy.mockOutSandboxCostAnalysis();
    cy.mockOutRegions();
    cy.mockOutSandboxVirtualMachineList();
    cy.mockOutCalculateVmName();
    cy.mockOutValidateVmUsername();
    cy.mockOutCalculateVmPrice();
    cy.mockOutVirtualMachine();
    cy.mockOutVirtualMachineRules();
    cy.mockOutVirtualMachineExtended();
});

Cypress.Commands.add('mockOutSandbox', () => {
    cy.intercept('/api/studies/*/sandboxes', {
        fixture: 'sandbox/sandbox.json'
    });
    cy.intercept('/api/sandboxes/*', {
        fixture: 'sandbox/sandbox.json'
    });
});

Cypress.Commands.add('mockOutAvailableDataset', (withOneDataset = false) => {
    if (withOneDataset) {
        cy.intercept('/api/sandbox/*/availabledatasets', { fixture: 'sandbox/availableDatasets.json' });
    } else {
        cy.intercept('/api/sandbox/*/availabledatasets', { fixture: 'common/emptyResponse.json' });
    }
});

Cypress.Commands.add('mockOutVmSizes', () => {
    cy.intercept('/api/virtualmachines/*/sizes', {
        fixture: 'sandbox/vmSizes.json'
    });
});

Cypress.Commands.add('mockOutVmDisks', () => {
    cy.intercept('/api/virtualmachines/*/disks', {
        fixture: 'sandbox/vmDisks.json'
    });
});

Cypress.Commands.add('mockOutVmOperatingSystems', () => {
    cy.intercept('/api/virtualmachines/*/operatingsystems', {
        fixture: 'sandbox/vmOperatingsystems.json'
    });
});

Cypress.Commands.add('mockOutSandboxResources', () => {
    cy.intercept('/api/sandboxes/*/resources', {
        fixture: 'sandbox/sandboxResources.json'
    });
});

Cypress.Commands.add('mockOutSandboxResourcesWithVM', () => {
    cy.intercept('/api/sandboxes/*/resources', {
        fixture: 'sandbox/sandboxResourcesWithVM.json'
    });
});

Cypress.Commands.add('mockOutSandboxCostAnalysis', () => {
    cy.intercept('/api/sandboxes/*/costanalysis');
});

Cypress.Commands.add('mockOutSandboxVirtualMachineList', (withOneVM = false) => {
    if (withOneVM) {
        cy.intercept('/api/virtualmachines/forsandbox/*', {
            fixture: 'sandbox/vmForSandbox.json'
        });
    } else {
        cy.intercept('/api/virtualmachines/forsandbox/*', {
            fixture: 'common/emptyList.json'
        });
    }
});

Cypress.Commands.add('mockOutCalculateVmName', () => {
    cy.intercept('/api/virtualmachines/calculateName', {
        fixture: 'sandbox/actualVmName.json'
    });
});

Cypress.Commands.add('mockOutValidateVmUsername', () => {
    cy.intercept('/api/virtualmachines/validateUsername', {
        fixture: 'sandbox/validateVmUsername.json'
    });
});

Cypress.Commands.add('mockOutCalculateVmPrice', () => {
    cy.intercept('/api/virtualmachines/*/calculatedVmprice', {
        fixture: 'sandbox/calculateVmPrice.json'
    });
});

Cypress.Commands.add('mockOutVirtualMachine', () => {
    cy.intercept('/api/virtualmachines/999', {
        fixture: 'sandbox/virtualMachine.json'
    });
});

Cypress.Commands.add('mockOutVirtualMachineRules', () => {
    cy.intercept('/api/virtualmachines/*/rules', {
        fixture: 'sandbox/virtualMachineRules.json'
    });
});

Cypress.Commands.add('mockOutVirtualMachineExtended', () => {
    cy.intercept('/api/virtualmachines/*/extended', {
        fixture: 'sandbox/vmExtended.json'
    });
});

// Study Viewer mocks

Cypress.Commands.add('mockOutRbacTests', () => {
    cy.mockOutResultsAndLearnings();
    cy.mockOutStudyList();
    cy.mockOutRegions();
    cy.mockOutSandboxResources();
    cy.mockOutAvailableDataset(true);
    cy.mockOutVmSizes();
    cy.mockOutVmOperatingSystems();
    cy.mockOutCalculateVmName();
    cy.mockOutSandboxCostAnalysis();
    cy.mockOutVmDisks();
    cy.mockOutValidateVmUsername();
    cy.mockOutCalculateVmPrice();
    cy.mockOutDeleteStudy();
    cy.mockOutAvailableRoles();
});
