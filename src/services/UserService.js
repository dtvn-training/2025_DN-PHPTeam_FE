import axios from './AxiosInstance';

const getUserFromToken = async () => {
    return await axios.get('/users/me');
};

export { getUserFromToken };
