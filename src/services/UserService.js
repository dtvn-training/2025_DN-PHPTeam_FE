import axios from './axiosInstance';

const getUserFromToken = async () => {
    return axios.get('api/profile/me');
};

export { getUserFromToken };
