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
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJlOTBjYmI2MS04OTZlLTRlYzctYWEzNy0yMzUxMTcwMGUxZWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwL3YyLjAiLCJpYXQiOjE2MTQ5NDA2OTAsIm5iZiI6MTYxNDk0MDY5MCwiZXhwIjoxNjE0OTQ0NTkwLCJhaW8iOiJBVFFBeS84VEFBQUFiaTlXZTNWRjdYMTJjbXRxQWFCNFM4eTlvWHRYLzJCbWhzVGMrVUZoTW8xb1A0ajdFdTVZN1p5ZDE4cHVERWIzIiwibmFtZSI6IkhhbnMgS3Jpc3RpYW4gVmlrIE9sc2VuIiwibm9uY2UiOiI1M2RjNGRiNC1jYTljLTQxNGYtYjRjYS1lZTNjMmIxZDQyNzkiLCJvaWQiOiI3NjIxMDZlZS04YmRhLTQyYjQtOGQ4YS01MzdiMDdiY2FiMDEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJIQU5PTEBlcXVpbm9yLmNvbSIsInJoIjoiMC5BQUFBTmFLa091SzIxVWlSbFhfUEJiUlpzR0c3RE9sdWljZE9xamNqVVJjQTRlMENBSTguIiwicm9sZXMiOlsiU2VwZXMtQWRtaW4iLCJTZXBlcy1FbXBsb3llZSJdLCJzdWIiOiI5Z0ZVVkpGUjdaWTBabHFDZHlaTWFnSlZjeXVZY18xUlRraHhBVUI1SzFJIiwidGlkIjoiM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwIiwidXRpIjoicDZka1VpMG96MGFJbEdSTERONXVBQSIsInZlciI6IjIuMCJ9.D25wuovsnDx0TF8dljDERUL6kAMSkg4GiDbhpJG8jN-449iLQz-QQ4zbUlr_yv3d18cLY67fqfbsYMrJpZDbhehJOZA5q9D_xphqxwOc1HjfmXxnB_FJowfzV77snuL6lAS_xGzxmbe3i-tDWRYLz22zlJQUWovwI9pibVH1KpbAYvvhaxwXoF4qbfERWG9r-fyblZ8SHAnMz5DctA9it3gEGiWLlS96GF8EUpfdWofdsYUvzVg7h4aW7-WQcFpIvsysoatBkfiHmSMEFoIH4jVBuhHb076Znm8KwnMp5aIglLeQUi1zApapJ4QWy5I-3aIyezZqyvYrOZRuVeDkQw';
    window.localStorage.setItem('cyToken', cyToken);
    //window.localStorage.setItem('cyToken', Cypress.env('scaAccessToken'));
});
