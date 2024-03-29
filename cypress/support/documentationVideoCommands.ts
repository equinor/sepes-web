import 'cypress-file-upload';

Cypress.Commands.add('createStudyForDocumentation', (studyName: string) => {
    cy.visit('/');
    cy.text('Now we will create a study', {
        duration: 2000,
        blocking: false,
        textSize: '3vh'
    });
    cy.get('[data-cy=new_study]').arrow({
        text: 'Click create study to go to the create-study form',
        textSize: '3vh',
        blocking: true,
        duration: 5000
    });
    cy.get('[data-cy=new_study]').click({ force: true });

    cy.get('[data-cy=change_logo]').arrow({
        text: 'Here you can add a logo for your study',
        textSize: '3vh',
        blocking: true,
        duration: 5000
    });
    cy.get('[data-cy=change_logo]').click();
    cy.get('[data-cy="logo_upload"]').attachFile('cypress.jpg');

    cy.get('[data-cy=study_name]').arrow({
        text: 'Enter the name of the study',
        textSize: '3vh',
        blocking: true,
        pointAt: 'bottomRight',
        duration: 5000
    });

    cy.get('[data-cy=study_name]').type(studyName);

    cy.get('[data-cy=study_vendor]').arrow({
        text: 'Enter the name of the vendor of the study',
        textSize: '3vh',
        blocking: true,
        pointAt: 'bottomRight',
        duration: 5000
    });

    cy.get('[data-cy=study_vendor]').type('cy vendor');

    cy.get('[data-cy=study_wbs]').arrow({
        text: 'WBS - needed to create data sets and sandboxes',
        textSize: '3vh',
        blocking: true,
        pointAt: 'bottomRight',
        duration: 5000
    });

    cy.get('[data-cy=study_wbs]').type('Automatic_test_cost');
    cy.waitForWbsCheck();

    cy.get('[data-cy=study_description]').arrow({
        text: 'Description of the study',
        textSize: '3vh',
        blocking: true,
        duration: 5000
    });

    cy.get('[data-cy=study_description]').type('cy description');
    cy.wait(2000);

    cy.get('[data-cy=create_study]').arrow({
        text: 'Click create study when all required field are filled out',
        textSize: '3vh',
        blocking: true,
        duration: 5000
    });

    cy.get('[data-cy=create_study]').click({ force: true });
    cy.waitForStudyToLoad();
});
