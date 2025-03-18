import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getPostDetail } from "../services/postService";
import { useState, useEffect } from "react";
import { formatTimestamp } from '../utils/ConvertDateTime';
import { PostStatus, ImagePlatform } from "../utils/Enum";

const PostDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [postData, setPostData] = useState(location.state?.post || {});

    const navigate = useNavigate();
    const handleViewInteractionClick = (postPlatformId) => {
        navigate(`/interactions/${postPlatformId}`);
    };

    useEffect(() => {
        if (!location.state?.post) {
            const fetchPost = async () => {
                try {
                    const post = await getPostDetail(id);
                    setPostData(post || {});
                } catch (error) {
                    console.error("Error fetching post:", error);
                }
            };
            fetchPost();
        }
    }, [id, location.state?.post]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-9 w-full">
            {postData?.postPlatforms?.map((postPlatform, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-6 w-full relative flex flex-col sm:w-full lg:w-auto"
                >
                    <div className="flex items-center space-x-2">
                        <img src={ImagePlatform[postPlatform.platform]} alt="platform" className="w-6 h-6" />
                        <h2 className="text-lg font-bold">{postPlatform.platform}</h2>
                    </div>

                    <div className="flex items-center space-x-4 my-4 text-gray-700">
                        <p className="flex items-center"><span className="text-lg mr-1">❤️</span> {postPlatform.likes ?? 0}</p>
                        <p className="flex items-center"><span className="text-lg mr-1">🔁</span> {postPlatform.shares ?? 0}</p>
                        <p className="flex items-center"><span className="text-lg mr-1">💬</span> {postPlatform.comments ?? 0}</p>
                    </div>

                    <p className="text-gray-500 text-sm">{postPlatform.status == PostStatus.SUCCESS ? formatTimestamp(postPlatform?.posted_at) : 'Not posted yet.'}</p>


                    <div className="mt-auto flex w-full items-end"
                        style={{ justifyContent: postPlatform.status === PostStatus.SUCCESS ? "space-between" : "flex-end" }}>

                        {postPlatform.status === PostStatus.SUCCESS && (
                            <div
                                onClick={() => handleViewInteractionClick(postPlatform.id)}
                                className="text-gray-500 hover:underline text-sm">
                                View interactions
                            </div>
                        )}

                        <button className={`px-4 py-2 rounded-lg text-white ${{
                            [PostStatus.SUCCESS]: "bg-green-500",
                            [PostStatus.FAILED]: "bg-red-500",
                            [PostStatus.PENDING]: "bg-yellow-500"
                        }[postPlatform.status] || "bg-gray-500"
                            }`}>
                            {postPlatform.status}
                        </button>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default PostDetail;
