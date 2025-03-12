import axios from './AxiosInstance';

const getUserFromToken = async () => {
    return await axios.get('/profile/me');
};

export { getUserFromToken };
