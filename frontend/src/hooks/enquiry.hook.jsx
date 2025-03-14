import { addEnquiry, deleteEnquiry, getAllEnquiry, getEnquiryById, getUserEnquiry, updateEnquiryStatus } from '@/api/enquiry.api';
import {useState} from 'react';

const useApiCall = (apiFunction) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const callApi = async(...args) => {
        setLoading(true);
        setError(null);

        try {
            const result = await apiFunction(...args);
            setData(result);
            return result;
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    return {data, error, loading, callApi};
}


//Enquiry hooks 

export const useAddEnquiry = () => useApiCall(addEnquiry);
export const useGetEnquiryById = () => useApiCall(getEnquiryById);
export const useGetAllEnquiry = () => useApiCall(getAllEnquiry);
export const useGetUserEnquiry = () => useApiCall(getUserEnquiry);
export const useUpdateEnquiryStatus = () => useApiCall(updateEnquiryStatus);
export const useDeleteEnquiry = () => useApiCall(deleteEnquiry);