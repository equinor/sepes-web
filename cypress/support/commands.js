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
    const cyToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJlOTBjYmI2MS04OTZlLTRlYzctYWEzNy0yMzUxMTcwMGUxZWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwL3YyLjAiLCJpYXQiOjE2MDUwOTI4NjksIm5iZiI6MTYwNTA5Mjg2OSwiZXhwIjoxNjA1MDk2NzY5LCJhaW8iOiJBVFFBeS84UkFBQUFoSGloTUZTR0xYbk5uZjhpSDFBTXNodkY0Tk1POXRYWG9GdzdhbDk1cjl4VWZyTTkySFVyNW1FbmlHWU5ISzZjIiwiYXpwIjoiZTkwY2JiNjEtODk2ZS00ZWM3LWFhMzctMjM1MTE3MDBlMWVkIiwiYXpwYWNyIjoiMCIsImVtYWlsIjoiSEFOT0xAZXF1aW5vci5jb20iLCJuYW1lIjoiSGFucyBLcmlzdGlhbiBWaWsgT2xzZW4iLCJvaWQiOiI3NjIxMDZlZS04YmRhLTQyYjQtOGQ4YS01MzdiMDdiY2FiMDEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJIQU5PTEBlcXVpbm9yLmNvbSIsInJoIjoiMC5BQUFBTmFLa091SzIxVWlSbFhfUEJiUlpzR0c3RE9sdWljZE9xamNqVVJjQTRlMENBSTguIiwicm9sZXMiOlsiU2VwZXMtQWRtaW4iXSwic2NwIjoiVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwiLCJzdWIiOiI5Z0ZVVkpGUjdaWTBabHFDZHlaTWFnSlZjeXVZY18xUlRraHhBVUI1SzFJIiwidGlkIjoiM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwIiwidXBuIjoiSEFOT0xAZXF1aW5vci5jb20iLCJ1dGkiOiIxS18xR1YyNFgweWZ0LWFDRkhvckFBIiwidmVyIjoiMi4wIn0.ioiJg61Nxs0PD7rOPhFIQ6AASsx3QkEOHm78YQZd-yMALGHZsKpQennQ-I9HXkgF2o6a0MrT1W0sbC3lmFUVLxVYjIXRuEnGSiHb9s7CA1AXGhlFCgDCu0WbSp6T3wL81XVlR3WaKZii6NpQGbiDuHsDvukyv8T7FOGBgvyrwXxvPZYFFV57LzAeSlpxoLzaMvStsVbzyVco0eTdnRbqI2JaI0zsddwuxDYnv4b2j6B7mR8ZFQPki34MyZ_6VQnAOq4TasqoVpKBrJgkfb_4KnaykqknTssUf2ZEZF-JZJwGVi4alajrrZXosICIsSzYinpKCmYoWNohR26KZHSKHQ';

    window.localStorage.setItem('cyToken', cyToken);
    //window.localStorage.setItem('cyToken', Cypress.env('scaAccessToken'));
});
