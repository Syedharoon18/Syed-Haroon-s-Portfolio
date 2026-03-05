import axios from 'axios';

const api = axios.create({
    baseURL: 'https://portfolio-backend1.onrender.com/api', // Pointing to port 8081
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
