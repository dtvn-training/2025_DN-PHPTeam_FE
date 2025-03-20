import axios from './axiosInstance';

const createPost = (content, images, listPlatforms, scheduledTime = null) => {
    const formData = new FormData();
    formData.append('content', content);
    images.forEach((image) => formData.append('mediaUrls[]', image));
    if (scheduledTime) {
        formData.append('scheduledTime', scheduledTime);
    }
    listPlatforms.forEach((platform) => formData.append('listPlatforms[]', platform));
    return axios.post('/api/posts', formData, {
        headers: {
            contentType: 'application/form-data',
        },
    });
};

const getMyPosts = async () => {
    const myPosts = await axios.get('/api/profile/posts');
    return myPosts.data?.data;
}

const getPostDetail = async (id) => {
    const myPosts = await axios.get(`/api/posts/${id}`);
    return myPosts.data?.data;
}

export { createPost, getMyPosts, getPostDetail };
