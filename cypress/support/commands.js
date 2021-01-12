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
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayJ9.eyJhdWQiOiJlOTBjYmI2MS04OTZlLTRlYzctYWEzNy0yMzUxMTcwMGUxZWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwL3YyLjAiLCJpYXQiOjE2MTA0NDU1ODgsIm5iZiI6MTYxMDQ0NTU4OCwiZXhwIjoxNjEwNDQ5NDg4LCJhaW8iOiJBVFFBeS84U0FBQUEwTnMzdHl2VDNjZUZGU0paVzZLVk9lc2pYenppdE9JQ1VrVmo3eFVveVp5bmo3M0VXTHRsWWFMVVlmc0JHeVpYIiwibmFtZSI6IkhhbnMgS3Jpc3RpYW4gVmlrIE9sc2VuIiwibm9uY2UiOiJiNjc2MDM0OS0xMmFjLTRkZTQtODBhYi02MTlmMzBjZDViZTUiLCJvaWQiOiI3NjIxMDZlZS04YmRhLTQyYjQtOGQ4YS01MzdiMDdiY2FiMDEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJIQU5PTEBlcXVpbm9yLmNvbSIsInJoIjoiMC5BQUFBTmFLa091SzIxVWlSbFhfUEJiUlpzR0c3RE9sdWljZE9xamNqVVJjQTRlMENBSTguIiwicm9sZXMiOlsiU2VwZXMtQWRtaW4iLCJTZXBlcy1FbXBsb3llZSJdLCJzdWIiOiI5Z0ZVVkpGUjdaWTBabHFDZHlaTWFnSlZjeXVZY18xUlRraHhBVUI1SzFJIiwidGlkIjoiM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwIiwidXRpIjoiRW9MWFRaeVVyazJkOHhJMi1idGtBQSIsInZlciI6IjIuMCJ9.QL20LcmKcNchoyQa4bVzoIvp16tLMhdwAqP3skodseSnT8MuR55efgOK8saXXqOVLn0yCv7RwhHTUpuZzi5RgC-dRuueIlrfNXY1Am0TohHJi6gBbDs82th5vrLQ0cQUxuWRilaJtbyqk1_M2KHG4NRnpedgPNKkt6_ppap0rxOdjKtytusCYGKnDv4Np68Y99NnoxWBpPGMb7SEtj-EDZxw8VcQdz0TFXsonT8hLor5laMoBKW-4pBY2BUuB1OwzVulCfp6kdtkBTb7PST_vQuEAa_08YT6bkAuTwuUrdpVrsZxnOADyCzug5oqi6amLiRzBf_H4li-0Up3oD15kA';

    window.localStorage.setItem('cyToken', cyToken);
    //window.localStorage.setItem('cyToken', Cypress.env('scaAccessToken'));
});
