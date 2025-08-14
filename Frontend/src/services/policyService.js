import api from './api';

export const uploadFile = (formData) => {
    return api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const searchPolicyByUsername = (username) => {
    return api.get(`/search?username=${encodeURIComponent(username)}`);
};

export const getAggregatedPolicies = () => {
    return api.get('/policies/aggregate');
};

export const scheduleMessage = (data) => {
    return api.post('/schedule-message', data);
};
