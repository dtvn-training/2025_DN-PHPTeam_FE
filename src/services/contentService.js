import axios from './axiosInstance';

const getEnhancedContent = async (content) => {
    const data = {
        "content": content,
    };
    const result = await axios.post('/api/contents', data);
    return result.data;
}

export { getEnhancedContent };
