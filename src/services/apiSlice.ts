import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: `${window.BASE_API_URI}api/`,
    prepareHeaders: (headers) => {
        const token = sessionStorage.getItem('accessToken');

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    }
});

// initialize an empty api service that we'll inject endpoints into later as needed
const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({})
});

export default apiSlice;
