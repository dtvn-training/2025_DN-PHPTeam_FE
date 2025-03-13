import axios from './AxiosInstance';

const getUserFromToken = () => {
    return axios.get('/profile/me');
};

export { getUserFromToken };
