import { addDestination, deleteDestination, getAllDestination, getDestinationById, updateDestination } from "@/api/destination.api";
import { useState } from "react";

const useApiCall = (apiFunction) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const callApi = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const result = await apiFunction(...args);
            setData(result);
            return result;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {data, error, loading, callApi};
}


//Destination hooks

export const useAddDestination = () => useApiCall(addDestination);
export const useGetAllDestination = () => useApiCall(getAllDestination);
export const useGetDestinationById = () => useApiCall(getDestinationById);
export const useUpdateDestination = () => useApiCall(updateDestination);
export const useDeleteDestination = () => useApiCall(deleteDestination);