describe('Create vm', function () {
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
    
    it('fills out study information', () => {
        cy.get('[data-cy=study_name]')
            .type('cy Title')
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
    

    it('clicks sandbox tab', () => {
        cy.get('[data-cy=sandbox_tab]')
                .click();
    });

        it('clicks sandbox', () => {
            cy.get('[data-cy=create_sandbox]')
                .click();
            
        });
        const sandboxName = Cypress._.random(0, 1e6);

        it('fills out sanbox information', () => {
            cy.get('[data-cy=sandbox_name]')
                .type(sandboxName)
            cy.get('[data-cy=sandbox_region]')
                .click()
            cy.contains('Norway East').click();
            cy.get('[data-cy=create_actual_sandbox]')
            .click()
            

        });


        it('fills out vm information', () => {
            cy.get('[data-cy=vm_name]')
                .type('cy name')
            cy.get('[data-cy=vm_username]')
                .type('cy username')
            cy.get('[data-cy=vm_password]')
                .type('Cypassword123!!')

            cy.get('[data-cy=vm_size]')
                .click()
            cy.contains("Standard_F1 (1 cores, 2048 MB Memory, os disk: 1047552, max data disks: 4)").click();

            cy.get('[data-cy=vm_operatingSystem]')
                .click()
            cy.contains("Windows Server 2019 Datacenter").click();

            cy.get('[data-cy=vm_dataDisks]')
                .click()
            cy.contains("64 GB").click();    

                cy.get('[data-cy=create_vm]')
            .click()
            cy.wait(3000)
                
        });

        it('creates VM rules', () => {
            cy.get('[data-cy=vm_add_rule]')

                cy.get('[data-cy=vm_size]')
                    .click()
                cy.contains("Standard_F1 (1 cores, 2048 MB Memory, os disk: 1047552, max data disks: 4)").click();

                cy.get('[data-cy=vm_operatingSystem]')
                    .click()
                cy.contains("Windows Server 2019 Datacenter").click();

                cy.get('[data-cy=vm_dataDisks]')
                    .click()
                cy.contains("64 GB").click();    

                    cy.get('[data-cy=create_vm]')
                .click()
            cy.get('[data-cy=vm_rule_description]')
                .type('cy rule description')
            cy.get('[data-cy=vm_rule_ip]')
                .type('192.168. 1.1')

            cy.get('[data-cy="vm_rule_protocol"]')
                .click()
            cy.contains("HTTP").click();

            cy.get('[data-cy="vm_rule_port"]')
                .type('80')

            cy.get('[data-cy=vm_rule_save]')
                .click() 
                
        });

        it('delete vm', () => {
            cy.get('[data-cy=vm_more_actions]')
                .click()
            cy.get('[data-cy="vm_delete"]')
                .click()
            cy.get('[data-cy="delete_resource"]')
                .type('vm-cytitle-' + sandboxName + '-cyname' )
            cy.get('[data-cy=delete_resource_delete]')
                .click()
            cy.wait(1000)
            
                
        });

        it('delete vm', () => {
            cy.get('[data-cy=delete_sandbox]')
                .click()
            cy.get('[data-cy="delete_resource"]')
                .type(sandboxName)
            cy.get('[data-cy=delete_resource_delete]')
                .click()
                
                
        });
    
        
    }