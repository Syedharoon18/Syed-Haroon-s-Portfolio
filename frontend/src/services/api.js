import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-portfolio-production-7884.up.railway.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
