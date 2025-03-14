import baseURL from "./config";

const fetchAPI = async(url , method = 'GET', body = null) => {
    headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(`${baseURL}/api/enquiry${url}`, {
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
    }
}



//Enquiry APIs 

export const addEnquiry = (data) => fetchAPI('/add', 'POST', data);
export const getEnquiryById = (id) => fetchAPI(`/get/${id}`);
export const getAllEnquiry = () => fetchAPI('/getall');
export const getUserEnquiry = () => fetchAPI('/user/all');
export const updateEnquiryStatus = (id, data) => fetchAPI(`/update/${id}`, 'PUT', data);
export const deleteEnquiry = (id) => fetchAPI(`/delete/${id}`, 'DELETE');