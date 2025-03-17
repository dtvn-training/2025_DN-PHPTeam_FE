import axios from './axiosInstance';

const postToLinkedin = (message, files) => {
    const formData = new FormData();
    formData.append('message', message);
    files.forEach((file) => {
        formData.append('images[]', file);
    });
    return axios.post('/api/linkedin/post', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export { postToLinkedin };
