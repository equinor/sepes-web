import { apiRequestWithToken } from 'auth/AuthFunctions';

const createEnquiry = async (category: string, shortdescription: string): Promise<any> => {
    const enquiry = { category, shortdescription };
    return apiRequestWithToken('api/servicenow', 'POST', enquiry);
};

export default createEnquiry;
