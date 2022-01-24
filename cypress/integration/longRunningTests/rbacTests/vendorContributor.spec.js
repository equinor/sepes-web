describe('Vendor contributor', () => {
    const studyName = 'Cypress Test';
    const sandboxName = 'Cypress ' + Cypress._.random(0, 1e6);
    before(() => {
        cy.login();
        cy.intercept('/api/permissions', { fixture: 'rbac/vendorContributor/permissions.json' });
        cy.visit('/');
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('cyToken');
        cy.login();
    });

    afterEach(() => {
        cy.login();
    });

    it('check that that vendor admin can do what the role allows', () => {
        cy.get('[data-cy=new_study]').should('be.disabled');
        cy.intercept('/api/permissions', { fixture: 'rbac/admin/permissions.json' });
        cy.refreshPage();

        cy.createStudyWithoutInterceptingStudy(studyName);
        cy.intercept('/api/studies/*', { times: 1 }, { fixture: 'rbac/vendorContributor/study.json' });
        cy.intercept('/api/studies/*/resultsandlearnings', { resultsAndLearnings: 'We learned a lot' });
        cy.get('[data-cy=edit_study]').should('be.disabled');

        cy.get('[data-cy=edit_results_and_learnings]').should('be.disabled');

        cy.switchToDatasetsTab();
        cy.get('[data-cy=add_study_specific_dataset]').should('be.disabled');

        // cy.switchToParticipantsTab();
        // cy.contains('Type minimum three chara').type('This should be disalbed').should('have.value', '');
        // cy.get('[data-cy=participant_search]').should('have.attr', 'isDisabled', 'disabled');
        // cy.get('[data-cy=participant_search]').invoke('attr', 'isDisabled').should('eq', true);

        cy.switchToSandboxesTab();
        cy.get('[data-cy=create_sandbox]').should('have.attr', 'disabled');

        cy.switchToDatasetsTab();
        cy.reload();
        cy.get('[data-cy=add_study_specific_dataset]').click();
        cy.createDataset();

        cy.wait(2000);
        cy.reload();
        cy.intercept(
            '/api/studies/*/datasets/*',
            { times: 1 },
            {
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
            }
        );

        cy.intercept('/api/datasets/*/files', {
            statusCode: 200,
            body: []
        });
        cy.get('[data-cy=dataset_edit]').should('be.disabled');

        cy.get('[data-cy=dataset_delete]').should('be.disabled');

        cy.get('[data-cy=file_upload_check]').should('have.css', 'opacity', '0.5');

        cy.get('[data-cy=dataset_back_to_study]').click({ force: true });
        cy.wait(3000);
        cy.switchToSandboxesTab();
        cy.login();
        cy.reload();
        cy.login();
        cy.get('[data-cy=create_sandbox]').click();
        cy.createSandbox(sandboxName);

        cy.createVm();

        cy.createVmRules();

        cy.location().then((loc) => {
            cy.wait(3000);
            cy.login();
            cy.reload();
            cy.login();
            cy.intercept(
                '/api/sandboxes/*',
                { times: 1 },
                {
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
                }
            );
            // cy.get('[data-cy=create_vm]').should('not.exist');
        });

        cy.get('[data-cy=create_vm]').should('not.exist');

        cy.get('[data-cy=sandbox_make_available]').should('be.disabled');

        cy.get('[data-cy=add_dataset_to_sandbox_check]').should('be.disabled');

        cy.get('[data-cy=vm_tab]').click({ force: true });

        cy.get('[data-cy=vm_more_actions]').click({ force: true });
        cy.get('[data-cy="vm_delete"]').should('have.attr', 'disabled');
        // cy.get('[data-cy="vm_delete"]').should('be.enabled');

        cy.get('[data-cy=vm_add_rule]').should('be.disabled');

        cy.get('[data-cy=sandbox_more_options]').click({ force: true });
        cy.get('[data-cy=sandbox_delete]').should('have.attr', 'disabled');

        cy.login();
        cy.reload();
        cy.login();
        cy.deleteSandbox(sandboxName);

        cy.deleteStudy(studyName);
    });
});
