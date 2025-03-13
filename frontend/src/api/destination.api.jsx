import baseURL from "./config";

const fetchAPI = async(url , method = 'GET', body = null , isFormData = false) => {
    const headers = {};
    if(!isFormData) headers['Content-Type'] = 'application/json';

    try {
        const response = await fetch(`${baseURL}/api/destination${url}`, {
            method ,
            headers ,
            body : body ? (isFormData ? body : JSON.stringify(body)) : null ,
            credentials:'include'
        });

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.message || 'Failed to fetch data');
        }

        if(data.success) {
            return data;
        }

    } catch (error) {
        alert(error.message);
    }
}



//Destination APIs

export const addDestination = (data) => fetchAPI('/add', 'POST', data);
export const getAllDestination = () => fetchAPI('/getall');
export const getDestinationById = (id) => fetchAPI(`/get/${id}`);
export const updateDestination = (id, data) => fetchAPI(`/update/${id}`, 'PUT', data);
export const deleteDestination = (id) => fetchAPI(`/delete/${id}`, 'DELETE');