import axios from './AxiosInstance';

const login = async (email, password) => {
    return await axios.post('/login', { email, password });
};

export { login };
