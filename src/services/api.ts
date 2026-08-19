import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,

    (error: unknown) => {
        if (axios.isAxiosError(error)) {
            if (error.code === 'ERR_NETWORK') {
                toast.error('Unable to connect to the server.');
                return Promise.reject(error);
            }

            const status = error.response?.status;
            const message = error.response?.data?.message;

            if (status === 500) {
                toast.error('Something went wrong on the server.');
            } else if (status === 403) {
                toast.error('Access denied.');
            } else if (Array.isArray(message)) {
                toast.error(message.join(', '));
            } else if (typeof message === 'string') {
                toast.error(message);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }

        return Promise.reject(error);
    },
);

export default api;