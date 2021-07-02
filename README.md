[![Cypress Test](https://github.com/equinor/sepes-web/actions/workflows/cypress.yml/badge.svg)](https://github.com/equinor/sepes-web/actions/workflows/cypress.yml)

# sepes-web

Source code for the Sepes web application

## Making commits

We use commitizen to make our commits. To make a commit, run "npm run commi" to start the questionare. We use these rules to say if a change is MAJOR, MINOR or a PATCH:

-   MAJOR version when you make incompatible API changes,
-   MINOR version when you add functionality in a backwards compatible manner, and
-   PATCH version when you make backwards compatible bug fixes.

## Run Tests

The command "npm run test" or "npm test" runs all tests with filename including .test.filename. There are two dummy tests in the projects already under the folder named "tests". To get coverage, append the command "-- --coverage". So it will be "npm run test -- --coverage".

## Run Cypress locally

There is a script named runcypress.ps1 in the repo. When you run this script you will get two options: One for running cypress in console, and one in window mode. These tests will run as a mock user and is a true E2E test.

Old way:

The command "npx cypress open" will open a new window containg all the cypress tests in the project. Clicking one will open a broweser window and run the test. The tests need an Token to work. To get this token is now a manual process. Before running a test. do these steps:

1. Npm start and run the application
2. Open your browser and navigate to application
3. Click F12 and go to the application tab
4. Find "Session Store" and look after "access token". A very long string of numbers and charachters. Copy it
5. Paste access token into the variable "cyToken" in cypress/support/commands.js
6. Run npx cypress open

### Testing in pipeline and coverage raport

Jest and cypress test will run with every pull request. Long cypress test will be put in it's own folder and rund at night time. To get the coverage report, click on either the jest or cypress action, and it will be an artifact there.

With pull request, the pipeline will create comments with a short overview of the results from testing.

### Run all/none tests in pull request

When creating a PR, you can pick a label named "Run all tests" to run all the cypress tests in the project. If you are wondering what tests will run, look in the cypress folder.

If you do not want to run any tests, pick the label named "Do not run tests".

If you change labels, they will only apply if you do a new commit, or create a new pull request. You can not add a label and rerun the tests after creating a pull request

## Setup locally

1. Clone project into local folder
2. Npm install in root folder of project
3. Create a file named "docker-compose.yml". Inside this file, you can create environment variables that can be used in the app. For instance ClientID or redirectUris

```javascript
version: "3.7"
services:
  web:
    build: .
    ports:
      - 8080:3000
    environment:
      - REACT_APP_SEPES_REDIRECT_URI=http://localhost:8080/
      - REACT_APP_SEPES_BASE_API_URL=http://localhost:8081/
      - REACT_APP_SEPES_AUTHORITY=https://login.microsoftonline.com/placeyourIdHere
      - REACT_APP_SEPES_CLIENTID=123
```

4. The environment variables are used in the AuthConfig and AuthFunctions files under the "Auth" folder. These needs to be the same as the radixconfig variables (used in the pipeline) and docker-compose.yml (local variables) files.
5. To run the app, run "Docker-compose up -d --build
    - If it does not work properly, try a different version of docker compose. Top line in docker-compose.yml.
6. To take down the app, run Docker-compose down
