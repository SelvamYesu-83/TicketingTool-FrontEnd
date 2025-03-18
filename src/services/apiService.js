import axios from "axios";

const PORTS = {
    company: '4001',
    user: '4002',
    module: '4003',
    rbac: '4004', // Role-Based Access Control
    formService: '4005'
};

const BASE_URL = "http://localhost";

// Function to create an Axios instance with conditional authorization header
const createApiClient = (port) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

    const headers = {
        "Content-Type": "application/json",
    };

    // Only add Authorization header if token exists
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return axios.create({
        baseURL: `${BASE_URL}:${port}`,
        timeout: 5000,
        headers: headers,
    });
};

// Common API service methods
const apiService = {
    get: async (port, endpoint, params = {}) => {
        try {
            const client = createApiClient(port);
            const response = await client.get(endpoint, { params });
            return response.data;
        } catch (error) {
            console.error(`GET ${endpoint} failed on port ${port}:`, error);
            throw error;
        }
    },

    post: async (port, endpoint, data = {}) => {
        try {
            const client = createApiClient(port);
            const response = await client.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error(`POST ${endpoint} failed on port ${port}:`, error);
            throw error;
        }
    },

    put: async (port, endpoint, data = {}) => {
        try {
            const client = createApiClient(port);
            const response = await client.put(endpoint, data);
            return response.data;
        } catch (error) {
            console.error(`PUT ${endpoint} failed on port ${port}:`, error);
            throw error;
        }
    },

    delete: async (port, endpoint) => {
        try {
            const client = createApiClient(port);
            const response = await client.delete(endpoint);
            return response.data;
        } catch (error) {
            console.error(`DELETE ${endpoint} failed on port ${port}:`, error);
            throw error;
        }
    }
};

export { apiService, PORTS };
