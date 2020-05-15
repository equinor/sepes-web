# sepes-web
Source code for the Sepes web application

#Setup locally

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

4. To run the app, run "Docker-compose up -d --build
	- If it does not work properly, try a different version of docker compose. Top line in docker-compose.yml.
5. To take down the app, run Docker-compose down
