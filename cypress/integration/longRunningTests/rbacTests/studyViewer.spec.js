describe('Study viewer vm', () => {
    const studyName = 'Cypress Test';
    before(() => {
        cy.login();
        cy.visit('/');
        cy.intercept('/api/permissions', {
            statusCode: 200,
            body: {
                admin: false,
                canCreateStudy: false,
                canEdit_PreApproved_Datasets: false,
                canRead_PreApproved_Datasets: false,
                datasetAdmin: false,
                emailAddress: 'mock@test.com',
                fullName: 'Mock User',
                sponsor: false,
                userName: 'mock@test.com'
            }
        });
    });

    beforeEach(() => {
        cy.restoreLocalStorageCache();
        Cypress.Cookies.preserveOnce('cyToken');
        cy.login();
    });

    afterEach(() => {
        cy.login();
        cy.saveLocalStorageCache();
    });

    it.skip('check that create study is disabled', () => {
        cy.get('[data-cy=new_study]').should('be.disabled');
    });

    it('create study', () => {
        cy.refreshPage();
        cy.createStudy(studyName);
    });

    it('check that edit is disabled', () => {
        cy.wait(2000);
        cy.reload();
        cy.intercept('/api/studies/*', {
            statusCode: 200,
            body: {
                name: studyName,
                vendor: 'Bouvet',
                wbsCode: 'abc123',
                restricted: false,
                description: 'Study about fishes',
                logoUrl: 'asdwasdasd',
                id: '1',
                resultsAndLearnings: 'We learned a lot',
                datasets: [],
                participants: [],
                sandboxes: [],
                permissions: {
                    addRemoveDataset: false,
                    addRemoveParticipant: false,
                    addRemoveSandbox: false,
                    closeStudy: false,
                    deleteStudy: false,
                    readResulsAndLearnings: false,
                    updateMetadata: false,
                    updateResulsAndLearnings: false
                }
            }
        });
        cy.get('[data-cy=edit_study]').should('be.disabled');
    });

    it('check that edit results and learnings is disabled', () => {
        cy.get('[data-cy=edit_results_and_learnings]').should('not.exist');
    });

    it('check that create study specific data set is disabled', () => {
        cy.switchToDatasetsTab();
        cy.get('[data-cy=add_study_specific_dataset]').should('be.disabled');
    });

    it('check that create sandbox is disabled', () => {
        cy.switchToSandboxesTab();
        cy.get('[data-cy=create_sandbox]').should('be.disabled');
    });

    it.skip('check that add participant is disabled', () => {
        cy.switchToParticipantsTab();
        cy.get('Type minimum three characters to search').type('test');
    });

    it('check that create study specific data set is disabled', () => {
        cy.switchToDatasetsTab();
        cy.reload();
        cy.get('[data-cy=add_study_specific_dataset]').click();
        cy.createDataset();
    });

    it('check that edit dataset is disabled', () => {
        cy.wait(2000);
        cy.reload();
        cy.intercept('/api/studies/*/datasets/*', {
            statusCode: 200,
            body: {
                areaL1: null,
                areaL2: null,
                asset: null,
                baDataOwner: null,
                classification: 'Open',
                countryOfOrigin: null,
                dataId: 2,
                description: null,
                id: 1103,
                location: 'northeurope',
                lraId: 0,
                name: 'Dataset Test',
                permissions: { editDataset: false, deleteDataset: false },
                sandboxDatasets: [],
                sourceSystem: null,
                storageAccountLink: 'thisisalink.com',
                storageAccountName: 'test',
                studies: []
            }
        });

        cy.intercept('/api/datasets/*/files', {
            statusCode: 200,
            body: []
        });
        cy.get('[data-cy=dataset_edit]').should('be.disabled');
    });

    it('check that delete dataset is disabled', () => {
        cy.get('[data-cy=dataset_delete]').should('be.disabled');
    });

    it('check that delete dataset is disabled', () => {
        cy.get('[data-cy=file_upload_check]').should('have.css', 'opacity', '0.5');
    });

    const sandboxName = 'Cypress ' + Cypress._.random(0, 1e6);

    it('create sandbox', () => {
        cy.get('[data-cy=dataset_back_to_study]').click({ force: true });
        cy.wait(3000);
        cy.switchToSandboxesTab();
        cy.login();
        cy.reload();
        cy.login();
        cy.get('[data-cy=create_sandbox]').click();
        cy.createSandbox(sandboxName);
    });

    it('create VM', () => {
        cy.createVm();
    });

    it('creates VM rules', () => {
        cy.createVmRules();
    });

    it('check that add new vm is not visible', () => {
        cy.location().then((loc) => {
            cy.wait(3000);
            cy.login();
            cy.reload();
            cy.login();
            cy.intercept('/api/sandboxes/*', {
                statusCode: 200,
                body: {
                    currentPhase: 0,
                    datasets: [
                        {
                            name: 'test'
                        }
                    ],
                    deleted: false,
                    id: loc.pathname.split('/')[4],
                    linkToCostAnalysis: '',
                    name: sandboxName,
                    permissions: {
                        update: false,
                        delete: false,
                        editInboundRules: false,
                        openInternet: false,
                        increasePhase: false
                    },
                    region: 'norwayeast',
                    restrictionDisplayText:
                        'Inbound network traffic from internet will be turned off but can be opened by a Sepes admin, Sponsor, Sponsor rep. or Vendor admin. Inbound network traffic from the Equinor network will also be turned off but can in the same way be opened by Sepes Admin, Sponsor, Sponsor rep or Vendor admin.\r\n\r\n Outbound network traffic to internet will be turned off but can be opened on request from a Sepes admin, Sponsor, Sponsor rep or Vendor admin.',
                    studyId: loc.pathname.split('/')[2],
                    studyName
                }
            });
            cy.get('[data-cy=create_vm]').should('not.exist');
        });
    });

    it('check that make available  is disabled', () => {
        cy.get('[data-cy=sandbox_make_available]').should('be.disabled');
    });

    it('check that adding data sets to sandbox is disabled', () => {
        cy.get('[data-cy=add_dataset_to_sandbox_check]').should('be.disabled');
    });

    it('check that delete vm is disabled', () => {
        cy.get('[data-cy=vm_more_actions]').click({ force: true });
        cy.get('[data-cy="vm_delete"]').should('have.attr', 'disabled', 'disabled');
    });

    it('check that adding vm rules is disabled', () => {
        cy.get('[data-cy=vm_add_rule]').should('be.disabled');
    });

    it('check that delete sandbox is disabled', () => {
        cy.get('[data-cy=sandbox_more_options]').click({ force: true });
        cy.get('[data-cy=sandbox_delete]').should('have.attr', 'disabled', 'disabled');
    });

    it('delete sandbox', () => {
        cy.login();
        cy.reload();
        cy.login();
        cy.deleteSandbox(sandboxName);
    });

    it('delete study', () => {
        cy.deleteStudy(studyName);
    });
});
