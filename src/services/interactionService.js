import axios from './axiosInstance';

const getInteractionsByPostPlatform = async (postPlatformId) => {
    const interactions = await axios.get(`/api/interactions/post-platform/${postPlatformId}`);
    return interactions.data?.data;
}

const getInteractionsByPost = async (postId) => {
    const interactions = await axios.get(`/api/interactions/post/${postId}`);
    return interactions.data?.data;
}

export { getInteractionsByPostPlatform, getInteractionsByPost };
