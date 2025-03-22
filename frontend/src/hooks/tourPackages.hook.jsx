import { addTourPackages, getAllTourPackages, getTourPackagesById, removeTourPackages } from "@/api/tourPackages.api";
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
            setError(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return {data, error, loading, callApi};
};


//Tour Packages Hooks

export const useAddTourPackages = () => useApiCall(addTourPackages);
export const useGetAllTourPackages = () => useApiCall(getAllTourPackages);
export const useGetTourPackagesById = () => useApiCall(getTourPackagesById);
export const useRemoveTourPackages = () => useApiCall(removeTourPackages);