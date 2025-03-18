import React, { useState, useEffect } from 'react';
import { getMyPosts } from '../services/postService';
import { formatTimestamp } from '../utils/ConvertDateTime';
import { useNavigate } from 'react-router-dom';

const ViewHistory = () => {
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await getMyPosts();
                setMyPosts(posts || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
                </div>
            ) : (
                <>
                    {myPosts.map((post) => (
                        <div
                            key={post.id}
                            className="rounded-[8px] bg-white p-[16px] px-4 py-4 mb-3"
                            onClick={() => handlePostClick(post.id)}
                        >
                            <p className="text-gray-700 font-medium">{post.content}</p>
                            <p className="text-sm text-gray-500">{formatTimestamp(post.scheduled_time)}</p>
                        </div>

                    ))}
                </>
            )}
        </div>
    );
};

export default ViewHistory;
