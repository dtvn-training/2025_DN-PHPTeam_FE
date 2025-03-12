import axios from './AxiosInstance';

const login = async (email, password) => {
    return await axios.post('/login', { email, password });
};

const register = async (email, full_name, password) => {
    return await axios.post('/register', { email, full_name, password });
};
export { login, register };
