describe('Create study', function () {
    before(() => {
        cy.login();
    });

    beforeEach(function () {
        Cypress.Cookies.preserveOnce('cyToken');
    });

    it('visits page', () => {
        cy.visit('/');
    });
    
    it('clicks create new project not using the wizard', () => {
        cy.get('[data-cy=new_study]')
            .click();
    });
    const studyName = "cy Title";
    it('fills out study information', () => {
        cy.get('[data-cy=study_name]')
            .type('studyName')
        cy.get('[data-cy=study_vendor]')
            .type('cy vendor')
        cy.get('[data-cy=study_wbs]')
            .type('cy wbs')
        cy.get('[data-cy=study_description]')
            .type('cy description')
    });

    it('clicks create new study', () => {
        cy.get('[data-cy=create_study]')
            .click();
        cy.wait(2000)
    });

    describe('Create study and edit', function () {
        it('clicks edit study', () => {
            cy.get('[data-cy=edit_study]')
                .click();
        });


        it('fills out study information again', () => {
            cy.get('[data-cy=study_name]')
                .type('cy Title edited')
            cy.get('[data-cy=study_vendor]')
                .type('cy vendor edited')
            cy.get('[data-cy=study_wbs]')
                .type('cy wbs edited')
            cy.get('[data-cy=study_description]')
                .type('cy description edited')
        });

        it('clicks create new study', () => {
            cy.get('[data-cy=create_study]')
                .click();
        });

        it('clicks edit results and learnings', () => {
            cy.get('[data-cy=edit_results_and_learnings]')
                .click();
        });

        it('fills out study information again', () => {
            cy.get('[data-cy=results_and_learnings]')
                .type('cy Results and learnings')
        });

        it('clicks save results and learnings', () => {
            cy.get('[data-cy=save_results_and_learnings]')
                .click();
            cy.wait(500)
        });

        it('clicks on data sets tab', () => {
            cy.get('[data-cy=datasets_tab]')
                .click();
        });
    

    describe('Create study specific dataset', function () {
        it('clicks edit study', () => {
            cy.get('[data-cy=add_study_specific_dataset]')
                .click();
        });

        it('fills out dataset information', () => {
            cy.get('[data-cy=dataset_name]')
                .type('cy name')
                /*
            cy.get('[data-cy=dataset_storage_name]')
                .type('cy storage')
                */
            cy.get('[data-cy=dataset_location]')
                .click()
            cy.contains("Norway East").click();
            cy.get('[data-cy=dataset_classification]')
                .click()
            cy.contains('Open').click();
            cy.get('[data-cy=dataset_dataId]')
                .type(1)
            cy.get('[data-cy=dataset_save]')
                .click();
            cy.wait(25000)
            cy.get('[data-cy=dataset_edit]')
                .click();
        });

        describe('Edit study specific dataset', function () {
    
            it('fills out dataset information again', () => {
                cy.get('[data-cy=dataset_name]')
                    .type('cy name edit')          
                cy.get('[data-cy=dataset_classification]')
                    .click()
                cy.contains('Internal').click();
                cy.get('[data-cy=dataset_dataId]')
                    .type(2)
                cy.get('[data-cy=dataset_save]')
                    .click();
            });

            it('Delete study specific dataset', () => {
                cy.get('[data-cy=dataset_delete]')
                    .click()         
                cy.get('[data-cy="delete_resource"]')
                    .type('cy namecy name edit')
                cy.get('[data-cy=delete_resource_delete]')
                    .click()
                    });

        describe('Delete study', function () {
    
            it('fills out dataset information again', () => {      
                cy.get('[data-cy=edit_study]')
                    .click()
                cy.get('[data-cy=study_options]')
                    .click()
                cy.get('[data-cy=study_delete]')
                    .click()
                cy.get('[data-cy="delete_resource"]')
                    .type('studyNamecy Title edited')
                cy.get('[data-cy=delete_resource_delete]')
                    .click()
                    
                });


    
            
    }