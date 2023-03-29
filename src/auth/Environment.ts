declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        tinymce?: any;
        CYPRESS: any;
        REDIRECT_URI: string | undefined;
        BASE_API_URI: string | undefined;
        TOKEN: string;
    }
}

const configureEnvironment = () => {
    // Get the cypress environment variables in localStorage
    const cypress: any = localStorage.getItem('cypress');

    if (cypress) {
        window.CYPRESS = JSON.parse(cypress);
        window.TOKEN = window.CYPRESS.cytoken || '';
        window.BASE_API_URI = window.CYPRESS.apiUrl || undefined;
    } else {
        window.CYPRESS = '';
        window.TOKEN = sessionStorage.getItem('accessToken') || '';
        window.REDIRECT_URI = window.REDIRECT_URI?.startsWith('http')
            ? window.REDIRECT_URI
            : process.env.REACT_APP_SEPES_REDIRECT_URI;
        window.BASE_API_URI = window.BASE_API_URI?.startsWith('http')
            ? window.BASE_API_URI
            : process.env.REACT_APP_SEPES_BASE_API_URL;
    }
};

configureEnvironment();

export {};
