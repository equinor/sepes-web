import apiSlice from 'services/apiSlice';

export type ResourceItem = {
    additionalProperties: any;
    linkToExternalSystem: string;
    name: string;
    retryLink: string;
    status: string;
    type: string;
};

export const resourceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getResourceList: builder.query<ResourceItem[], string>({
            query: (sandboxId: string) => 'sandboxes/' + sandboxId + '/resources'
        })
    })
});

export const { useGetResourceListQuery, useLazyGetResourceListQuery } = resourceApi;
