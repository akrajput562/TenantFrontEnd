import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Define backend base URL
//const API_BASE_URL = 'http://localhost:8080/pg';
const API_BASE_URL='http://192.168.29.155:8080/pg'
export const apiClient = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    authToken?: string
) => {
    try {
        let options: {
            method: 'GET' | 'POST' | 'PUT' | 'DELETE';
            url: string;
            headers: Record<string, string>;
            data?: any; // ✅ Explicitly add 'data' property
        } = {
            method,
            url: `${API_BASE_URL}${endpoint}`,
            headers: {
                'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
                // Ensure the Authorization header is included only when authToken exists
                ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}) // If authToken exists, add it
            },
        };

        // Handle FormData & JSON
        if (body) {
            if (body instanceof FormData) {
                options.data = body;
                options.headers['Content-Type'] = 'multipart/form-data'; // ✅ FormData case
            } else {
                options.data = JSON.stringify(body);
                options.headers['Content-Type'] = 'application/json'; // ✅ JSON case
            }
        }

        // Send request
        const response = await axios(options);
        return response.data; // ✅ Ensure response data is returned
    } catch (error: any) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error;
    }
};

export default apiClient;
