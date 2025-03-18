import axios from './axiosInstance';

const createPost = async (content, mediaUrls, scheduledTime, listPlatforms) => {
    const data = {
        "content": content,
        "mediaUrls": mediaUrls,
        "scheduledTime": scheduledTime,
        "listPlatforms": listPlatforms
    };
    const result = await axios.post('/api/posts', data);
    return result.data;
}

const getMyPosts = async () => {
    const myPosts = await axios.get('/api/profile/posts');
    return myPosts.data?.data;
}

const getPostDetail = async (id) => {
    const myPosts = await axios.get(`/api/posts/${id}`);
    return myPosts.data?.data;
}

export { createPost, getMyPosts, getPostDetail };
