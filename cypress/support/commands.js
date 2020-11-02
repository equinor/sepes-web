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
    const cyToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJlOTBjYmI2MS04OTZlLTRlYzctYWEzNy0yMzUxMTcwMGUxZWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwL3YyLjAiLCJpYXQiOjE2MDQzMTgzMzksIm5iZiI6MTYwNDMxODMzOSwiZXhwIjoxNjA0MzIyMjM5LCJhaW8iOiJBVFFBeS84UkFBQUEzaGFGbTBHaTFxNjJyTG80RUtSY3hvbDhjQkZCOElvMi9saWNTWmNQVW81RkwzUXM5MlNlQXdLTlE3RFNWWThFIiwiYXpwIjoiZTkwY2JiNjEtODk2ZS00ZWM3LWFhMzctMjM1MTE3MDBlMWVkIiwiYXpwYWNyIjoiMCIsImVtYWlsIjoiSEFOT0xAZXF1aW5vci5jb20iLCJuYW1lIjoiSGFucyBLcmlzdGlhbiBWaWsgT2xzZW4iLCJvaWQiOiI3NjIxMDZlZS04YmRhLTQyYjQtOGQ4YS01MzdiMDdiY2FiMDEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJIQU5PTEBlcXVpbm9yLmNvbSIsInJoIjoiMC5BQUFBTmFLa091SzIxVWlSbFhfUEJiUlpzR0c3RE9sdWljZE9xamNqVVJjQTRlMENBSTguIiwicm9sZXMiOlsiU2VwZXMtQWRtaW4iXSwic2NwIjoiVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwiLCJzdWIiOiI5Z0ZVVkpGUjdaWTBabHFDZHlaTWFnSlZjeXVZY18xUlRraHhBVUI1SzFJIiwidGlkIjoiM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwIiwidXBuIjoiSEFOT0xAZXF1aW5vci5jb20iLCJ1dGkiOiJ3RC03c2NtZDEwMkpGd21qd2hzYkFBIiwidmVyIjoiMi4wIn0.SSEojZQiKm-ST6XhTzux4t1hnaP39vQPKL3DOjxOVJUKQ8qstUBHley0Ao-PiAaPieJddz9ZFHYF38SyLt7sPCe_S5H4_RwPhHANtpEpMOzMFDlkMVSP5G-JhR460L9rkzdvadEsiYVkFv8zIwgF2BUxFkLBxABXhzCmrf-pMMoP0FwoehP9oUPSy9mLdgqW1CxufXuHBqI_trdJB_uLqkPMFU39MRcJB_VRPSkH_C2zRtt9cGTHH02I9qBNNb3up2DJsF2J7PsETv4sSmvhSWynvYuPeeTZakx__JUpQqYZVW5JB7APqsoYRNL0Z8suuKk7heMhztkvfSORkgyaWg';

    window.localStorage.setItem('cyToken', cyToken);
    //window.localStorage.setItem('cyToken', Cypress.env('scaAccessToken'));
});
