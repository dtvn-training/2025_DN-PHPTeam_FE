import axios from './axiosInstance';

const getSocialAccountsOfUser = () => {
    return axios.get('api/profile/social-accounts');
};

export { getSocialAccountsOfUser };
