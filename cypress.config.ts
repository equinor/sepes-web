import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 200000,
  requestTimeout: 200000,
  responseTimeout: 200000,
  video: false,
  nodeVersion: 'system',
  env: {
    TENANT_ID: '',
    CLIENT_ID: '',
    CLIENT_SECRET: '',
    API_URL: 'http://localhost:44371/',
    SCOPE: '',
    RETRIES: 3,
  },
  retries: {
    runMode: 2,
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
    baseUrl: 'http://localhost:3000/',
  },
})
