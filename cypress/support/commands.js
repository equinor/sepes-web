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
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayJ9.eyJhdWQiOiJlOTBjYmI2MS04OTZlLTRlYzctYWEzNy0yMzUxMTcwMGUxZWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwL3YyLjAiLCJpYXQiOjE2MDg1NTA5MjYsIm5iZiI6MTYwODU1MDkyNiwiZXhwIjoxNjA4NTU0ODI2LCJhaW8iOiJBVFFBeS84U0FBQUF3SzZQOHlKTUJjSGt4anFSOE4xUU5mbjNZdHU0NUNCWUdpaEJTRXBTeUZGMEwyak9zV1hEcDRQeElmV2pXMFVSIiwibmFtZSI6IkhhbnMgS3Jpc3RpYW4gVmlrIE9sc2VuIiwibm9uY2UiOiI1MDQ0Y2YyZi1hYzFlLTQyOTktODExNi04YzkxNTgwNzc0MDAiLCJvaWQiOiI3NjIxMDZlZS04YmRhLTQyYjQtOGQ4YS01MzdiMDdiY2FiMDEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJIQU5PTEBlcXVpbm9yLmNvbSIsInJoIjoiMC5BQUFBTmFLa091SzIxVWlSbFhfUEJiUlpzR0c3RE9sdWljZE9xamNqVVJjQTRlMENBSTguIiwicm9sZXMiOlsiU2VwZXMtQWRtaW4iLCJTZXBlcy1FbXBsb3llZSJdLCJzdWIiOiI5Z0ZVVkpGUjdaWTBabHFDZHlaTWFnSlZjeXVZY18xUlRraHhBVUI1SzFJIiwidGlkIjoiM2FhNGEyMzUtYjZlMi00OGQ1LTkxOTUtN2ZjZjA1YjQ1OWIwIiwidXRpIjoiNXJiTjJ6b2JjRTJGVllnWXdzSU1BQSIsInZlciI6IjIuMCJ9.bGqW1GDI6N55qpBVf9TWyLLfrU_B8zfDueJIpwBuFTlSucKwlVpVwKS-8R2agpfDuBfNvGF0_xzS368eYOgF14Ruh5fm7VF5kkttRbeNh_B0FX2YWLH_kbVFBQ-pv3UYw0tUgLeF73nSQDmu29q-hcXLGauGaemqvLe-JXi6qPvCC-2IXNpbysOCbL6eqEbcK419I-_V97fgXPShVVm6nCAHYqVB3c6rwenUFCjzrsqfe7TZvcH8OL5JEn-dn6D2Cu2hIMHE3kyqqs-QlriYi2dF_s3zFvQ_edfDN8VntAjuu7LfpE9h0clOVW3LQG8gWC-wu9jzyw9BTJLxjjoJYg';

    window.localStorage.setItem('cyToken', cyToken);
    //window.localStorage.setItem('cyToken', Cypress.env('scaAccessToken'));
});
