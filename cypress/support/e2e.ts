// ***********************************************************
// This example support/index.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';
import './mocking';
import 'cypress-dark';
import '@cypress/code-coverage/support';
import 'cypress-movie/commands';

interface ArrowOptions {
    text?: string;
    textSize?: string;
    duration?: number;
    blocking?: boolean;
    pointAt?: 'bottomLeft' | 'bottomRight';
    offsetX?: number;
    offsetY?: number;
    strokeWidth?: number;
    color?: string;
}
interface TextOptions {
    duration?: number;
    blocking?: boolean;
    textSize?: string;
}

declare global {
    namespace Cypress {
      interface Chainable {

        login(accessType?: string): Chainable<Element>;
        refreshPage(): Chainable<Element>;
        saveLocalStorageCache(): Chainable<Element>;
        restoreLocalStorageCache(): Chainable<Element>;
        clearViewport(): Chainable<Element>;
        waitForWbsCheck(): Chainable<Element>;
        addMockUserAsParticipant(): Chainable<Element>;
        editResultsAndLearnings(): Chainable<Element>;
        getEnvironment(): Chainable<Element>;

        // Dataset
        createDataset(): Chainable<Element>;
        deleteDataset(datasetName: string): Chainable<Element>;

        // Study
        waitForStudyToLoad(): Chainable<Element>;
        deleteStudy(studyName: string):Chainable<Element>;
        createStudy(studyName: string): Chainable<Element>;
        createStudyWithLogo(studyName: string):Chainable<Element>;
        createStudyWithoutInterceptingStudy(studyName: string):Chainable<Element>;

        // VM
        createVm(intercept?: boolean): Chainable<Element>;
        createVmRules(wait?: number): Chainable<Element>;
        deleteVm(sandboxName: string): Chainable<Element>;
        waitForVirtualMachineToBeCreated(): Chainable<Element>;
        
        // Sandbox
        waitForSandboxToLoad(): Chainable<Element>;
        deleteSandbox(sandboxName: string): Chainable<Element>;
        createSandbox(sandboxName: string): Chainable<Element>;

        //Tabs
        switchToParticipantsTab(): Chainable<Element>;
        switchToParticipantsTab(): Chainable<Element>;
        switchToDatasetsTab(): Chainable<Element>;
        switchToSandboxesTab(): Chainable<Element>;

        // Movie
        text(text: string, options: TextOptions): Chainable<Element>;
        arrow(options: ArrowOptions): Chainable<Element>;

        // Mocks
        commonStudyMocks(): Chainable<Element>;
        mockOutStudyList(): Chainable<Element>;
        mockOutStudy(): Chainable<Element>;
        mockOutDeleteStudy(): Chainable<Element>;
        mockOutResultsAndLearnings(): Chainable<Element>;
        mockOutPermissions(): Chainable<Element>;
        mockOutStudyParticipant(): Chainable<Element>;
        mockOutAvailableRoles(): Chainable<Element>;
        mockOutAllCallsForCreateDatasetDocsTest(): Chainable<Element>;
        mockOutDataSet(): Chainable<Element>;
        mockOutDataSetDelete(): Chainable<Element>;
        mockOutRegions(): Chainable<Element>;
        mockOutDatasetResources(): Chainable<Element>;
        mockOutAllCallsForCreateSandboxAndVirtualmachineDocsTest(): Chainable<Element>;
        mockOutSandbox(): Chainable<Element>;
        mockOutAvailableDataset(withOneDataset?: boolean): Chainable<Element>;
        mockOutVmSizes(): Chainable<Element>;
        mockOutVmDisks(): Chainable<Element>;
        mockOutVmOperatingSystems(): Chainable<Element>;
        mockOutSandboxResources(): Chainable<Element>;
        mockOutSandboxResourcesWithVM(): Chainable<Element>;
        mockOutSandboxCostAnalysis(): Chainable<Element>;
        mockOutSandboxVirtualMachineList(withOneVm?: boolean): Chainable<Element>;
        mockOutCalculateVmName(): Chainable<Element>;
        mockOutValidateVmUsername(): Chainable<Element>;
        mockOutCalculateVmPrice(): Chainable<Element>;
        mockOutVirtualMachine(): Chainable<Element>;
        mockOutVirtualMachineRules(): Chainable<Element>;
        mockOutVirtualMachineExtended(): Chainable<Element>;
        mockOutRbacTests(): Chainable<Element>;

        /** 
         * ! Not implemented. Command currently not in use
         */
        isNotActionable(): Chainable<Element>;

    }
    }
  }