exports.config = {
    local: {
        REDIRECT_URI: 'http://localhost:3000/',
        BASE_API_URI: 'https://backend-sepes-api-dev.radix.equinor.com/'
    },
    dev: {
        REDIRECT_URI: 'https://frontend-sepes-web-dev.radix.equinor.com/',
        BASE_API_URI: 'https://backend-sepes-api-dev.radix.equinor.com/'
    },
    prod: {
        REDIRECT_URI: 'https://sepes.equinor.com/',
        BASE_API_URI: 'https://backend-sepes-api-prod.radix.equinor.com/'
    }
};
