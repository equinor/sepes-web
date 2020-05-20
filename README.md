# sepes-web
Source code for the Sepes web application

# Making commits

We use commitizen to make our commits. To make a commit, run "npm run commi" to start the questionare. We use these rules to say if a change is MAJOR, MINOR or a PATCH:

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards compatible manner, and
- PATCH version when you make backwards compatible bug fixes.

## Run Tests

The command "npm run test" or "npm test" runs all tests with filename including .test.filename. There are two dummy tests in the projects already under the folder named "tests". To get coverage, append the command "-- --coverage". So it will be "npm run test -- --coverage".

Cypress:

## Setup locally

1. Clone project into local folder
2. Npm install in root folder of project
3. Create a file named "docker-compose.yml". Inside this file, you can create environment variables that can be used in the app. For instance ClientID or redirectUris

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
4. The environment variables are used in the AuthConfig and AuthFunctions files under the "Auth" folder. These needs to be the same as the radixconfig variables (used in the pipeline) and docker-compose.yml (local variables) files.
5. To run the app, run "Docker-compose up -d --build
	- If it does not work properly, try a different version of docker compose. Top line in docker-compose.yml.
6. To take down the app, run Docker-compose down
