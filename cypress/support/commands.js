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
    const cyToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJlOTBjYmI2MS04OTZlLTRlYzctYWEzNy0yMzUxMTcwMGUxZWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwL3YyLjAiLCJpYXQiOjE2MjA3MTUxODMsIm5iZiI6MTYyMDcxNTE4MywiZXhwIjoxNjIwNzE5MDgzLCJhaW8iOiJBVFFBeS84VEFBQUE2cVBCdWlodzMzVlBUdGRjU0t0RVkrdHcvaWxlTjRWV2hBaVpWc0JOZG43VmhUY3FpT1dWL2M0dHJrYzFZKzV1IiwiYXpwIjoiZTkwY2JiNjEtODk2ZS00ZWM3LWFhMzctMjM1MTE3MDBlMWVkIiwiYXpwYWNyIjoiMCIsImVtYWlsIjoiSEFOT0xAZXF1aW5vci5jb20iLCJuYW1lIjoiSGFucyBLcmlzdGlhbiBWaWsgT2xzZW4iLCJvaWQiOiI3NjIxMDZlZS04YmRhLTQyYjQtOGQ4YS01MzdiMDdiY2FiMDEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJIQU5PTEBlcXVpbm9yLmNvbSIsInJoIjoiMC5BUUlBTmFLa091SzIxVWlSbFhfUEJiUlpzR0c3RE9sdWljZE9xamNqVVJjQTRlMENBSTguIiwicm9sZXMiOlsiU2VwZXMtU3BvbnNvciIsIlNlcGVzLUFkbWluIiwiU2VwZXMtRW1wbG95ZWUiXSwic2NwIjoiVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwgVXNlci5JbXBlcnNvbmF0aW9uIiwic3ViIjoiOWdGVVZKRlI3WlkwWmxxQ2R5Wk1hZ0pWY3l1WWNfMVJUa2h4QVVCNUsxSSIsInRpZCI6IjNhYTRhMjM1LWI2ZTItNDhkNS05MTk1LTdmY2YwNWI0NTliMCIsInVwbiI6IkhBTk9MQGVxdWlub3IuY29tIiwidXRpIjoicnc2QXdqZmpKRVNlTmtBYWpjUVBBQSIsInZlciI6IjIuMCJ9.RudQ64kZyBtLj06BX0uQa5wmt5LIBLpJqmf6PXmlQvHElO0c-LolTYR9c435CpHuvyDsnx4OsXfsGYxEB98HdkvxGeiHS-sQRlsFJ-4JxgfFTKqej2CM1CIBy6oQDQwhrWQzaaDx0GTPLEFlBsr5kTMdAh9iWwJ66fFAN1PRdSSmupHu992zL6McSHs8BE0rB4JhtRlYOCqbuiHl84Katz-pfM6dDwJl8UST3gTjAxGPHc62nZZYloKBjcwwBAwAVh_wQLg5KaPnhi6bxlfg4x9BepjFsU4D98VGj5IY2dCw5P9OFFxg8tM1Tqpx2oXEpUkOOHqiydYxvov4QGUZhw';
    window.localStorage.setItem('cyToken', cyToken);
    //window.localStorage.setItem('cyToken', Cypress.env('cyAccessToken'));
});
