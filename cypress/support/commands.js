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
    const cyToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJlOTBjYmI2MS04OTZlLTRlYzctYWEzNy0yMzUxMTcwMGUxZWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwL3YyLjAiLCJpYXQiOjE2MDM5ODI4NjIsIm5iZiI6MTYwMzk4Mjg2MiwiZXhwIjoxNjAzOTg2NzYyLCJhaW8iOiJBVFFBeS84UkFBQUFFMkNCTlFTQ1M5SFBZb08xcjczU1pjay9yVVNWNVUxK0hRQ1FkSUJQVGpTTUZqTDdDK1dTUExQOThUUXVIZk5TIiwiYXpwIjoiZTkwY2JiNjEtODk2ZS00ZWM3LWFhMzctMjM1MTE3MDBlMWVkIiwiYXpwYWNyIjoiMCIsImVtYWlsIjoiSEFOT0xAZXF1aW5vci5jb20iLCJuYW1lIjoiSGFucyBLcmlzdGlhbiBWaWsgT2xzZW4iLCJvaWQiOiI3NjIxMDZlZS04YmRhLTQyYjQtOGQ4YS01MzdiMDdiY2FiMDEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJIQU5PTEBlcXVpbm9yLmNvbSIsInJoIjoiMC5BQUFBTmFLa091SzIxVWlSbFhfUEJiUlpzR0c3RE9sdWljZE9xamNqVVJjQTRlMENBSTguIiwicm9sZXMiOlsiU2VwZXMtQWRtaW4iXSwic2NwIjoiVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwiLCJzdWIiOiI5Z0ZVVkpGUjdaWTBabHFDZHlaTWFnSlZjeXVZY18xUlRraHhBVUI1SzFJIiwidGlkIjoiM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwIiwidXBuIjoiSEFOT0xAZXF1aW5vci5jb20iLCJ1dGkiOiJzdmt3N0cxN1AwSzJPQ2FoYmpRa0FBIiwidmVyIjoiMi4wIn0.wRkpvBRHoQoPZxEtWxzk5gNMfhVYT283OcTYO78y--RRq-a5Lcia4_Z_N4jzgTUc6gcCWoG6LjUsX8X56mZI4Cx9dFRtgpGy5_qudMI776hUBDWE3I39dBjFbLp1RkaOLM7xP5e7J8yIrXxCCj3KVwaikGeBZckrFuISnjyMrJ1pNrosSkngsITlI7Dlv3zzk5siyhQspNLM_2GppXgCdAHjtpb5ePKPaS3Yzzs62Mkcqs-IDXD7kntDgrlNvdxotwY7Y_BMLjk-ovuc6j0akqhgFTOcyE1EeFQ8H4lw1jscRO189kACFHMPId8Cs-Pw9dBsngED7Op5T7-rtkTQaw';

    window.localStorage.setItem('cyToken', cyToken);
    //window.localStorage.setItem('cyToken', Cypress.env('scaAccessToken'));
});
