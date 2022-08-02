import { defineConfig } from 'cypress';

export default defineConfig({
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 200000,
    requestTimeout: 200000,
    responseTimeout: 200000,
    video: true,
    videoUploadOnPasses: false,
    nodeVersion: 'system',
    chromeWebSecurity: false,
    e2e: {
        baseUrl: 'http://localhost:3000',
        env: {
            API_URL: 'https://backend-sepes-api-dev.radix.equinor.com/',
        }
    },
    env: {
        TENANT_ID: '',
        CLIENT_ID: '',
        CLIENT_SECRET: '',
        API_URL: 'https://backend-sepes-api-dev.radix.equinor.com/',
        SCOPE: 'User.Read User.Read.All User.Impersonation',
        RETRIES: 3
    },
    retries: {
        runMode: 2
    },
    viewportWidth: 1920,
    viewportHeight: 1080
});
