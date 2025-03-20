import axios from './axiosInstance';

const getSocialAccountsOfUser = async () => {
    const result = await axios.get('api/profile/social-accounts');
    return result.data
};

export { getSocialAccountsOfUser };
