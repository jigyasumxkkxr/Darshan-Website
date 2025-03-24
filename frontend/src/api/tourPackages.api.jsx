import baseURL from "./config";

const fetchAPI = async(url , method = 'GET', body = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(`${baseURL}/api/destination-tour-packages${url}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
            credentials:'include'
        });

        const data = await response.json();
        if(!response.ok) {
            throw new Error(data.message || 'Failed to fetch');
        }
        
        if(data.success) {
            return data;
        }

    } catch (error) {
        alert(error.message);
        throw new Error(error.message);
    }
}



//Tour Packages API

export const addTourPackages = (data) => fetchAPI('/add', 'POST', data);
export const getAllTourPackages = () => fetchAPI('/all');
export const getTourPackagesById = (id) => fetchAPI(`/get/${id}`);
export const removeTourPackages = (id) => fetchAPI(`/remove/${id}`, 'DELETE');