import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getPostDetail } from "../services/postService";
import { useState, useEffect, useRef } from "react";
import { formatTimestamp } from '../utils/ConvertDateTime';
import { PostStatus, ImagePlatform } from "../utils/Enum";
import { getInteractionsByPost } from "../services/interactionService";

const PostDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [postData, setPostData] = useState(location.state?.post || {});
    const hasFetchedInteractions = useRef(false);

    const navigate = useNavigate();
    const handleViewInteractionClick = (postPlatformId) => {
        navigate(`/interactions/${postPlatformId}`);
    };

    useEffect(() => {
        let post = location.state?.post;

        const fetchPost = async () => {
            try {
                post = await getPostDetail(id);
                setPostData(post || {});
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        if (!post) {
            fetchPost();
        } else {
            setPostData(post);
        }
    }, [id, location.state?.post]);

    useEffect(() => {
        if (!postData || !postData.postPlatforms || postData.postPlatforms.length === 0 || hasFetchedInteractions.current) return;

        const fetchInteractions = async () => {
            try {
                const interactions = await getInteractionsByPost(id);
                console.log({ interactions });
                console.log({ postData });

                const postWithInteractions = {
                    ...postData,
                    postPlatforms: postData.postPlatforms.map(x => ({
                        ...x,
                        numberOfLikes: interactions.find(i => i.id == x.id)?.interactions?.number_of_likes ?? 0,
                        numberOfComments: interactions.find(i => i.id == x.id)?.interactions?.number_of_comments ?? 0,
                        numberOfShares: interactions.find(i => i.id == x.id)?.interactions?.number_of_shares ?? 0,
                    }))
                };
                console.log({ postWithInteractions });

                setPostData(postWithInteractions);
                hasFetchedInteractions.current = true;
            } catch (error) {
                console.error("Error fetching interactions:", error);
            }
        };

        fetchInteractions();
    }, [postData]);

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
                        <p className="flex items-center"><span className="text-lg mr-1">❤️</span> {postPlatform.numberOfLikes ?? 0}</p>
                        <p className="flex items-center"><span className="text-lg mr-1">🔁</span> {postPlatform.numberOfShares ?? 0}</p>
                        <p className="flex items-center"><span className="text-lg mr-1">💬</span> {postPlatform.numberOfComments ?? 0}</p>
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
