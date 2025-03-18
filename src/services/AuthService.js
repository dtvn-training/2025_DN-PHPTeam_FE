import axios from './axiosInstance';

const login = async (email, password) => {
    return axios.post('/login', { email, password });
};

const register = async (email, full_name, password) => {
    return axios.post('/register', { email, full_name, password });
};

export { login, register };
