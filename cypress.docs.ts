import { defineConfig } from 'cypress';

export default defineConfig({
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 200000,
    requestTimeout: 200000,
    responseTimeout: 200000,
    video: true,
    videoUploadOnPasses: true,
    nodeVersion: 'system',
    chromeWebSecurity: false,
    e2e: {
        baseUrl: 'http://localhost:3000/',
    },
    env: {
        TENANT_ID: '',
        CLIENT_ID: '',
        CLIENT_SECRET: '',
        API_URL: 'http://localhost:44371/',
        SCOPE: 'User.Read User.Read.All User.Impersonation',
        'cypress-movie': {
            enabled: true,
            cursorTracking: {
                enabled: true,
                shape: 'dot'
            },
            width: 1920,
            height: 1080
        }
    },
    viewportWidth: 1920,
    viewportHeight: 1080
});
