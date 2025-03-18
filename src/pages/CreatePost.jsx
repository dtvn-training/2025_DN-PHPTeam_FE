import { useState, useRef, useEffect } from 'react';
import { FaLinkedin, FaTwitter, FaUpload, FaTimes } from 'react-icons/fa';
import { isValidImageType } from '../utils/ValidationImageType';
import { getSocialAccountsOfUser } from '../services/socialAccountService';
import { createPost } from '../services/postService';
import { HttpStatusCode } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../components/Loading';
import { formatScheduleTime } from '../utils/ConvertDateTime';

export default function CreatePost() {
    const fileInputRef = useRef(null);
    const [schedule, setSchedule] = useState(false);
    const [content, setContent] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [imagesPreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState([]);
    const [listPlatforms, setListPlatforms] = useState([]);
    const [mySocialAccounts, setMySocialAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSocialAccounts = async () => {
            const response = await getSocialAccountsOfUser();
            if (response.status === HttpStatusCode.Ok) {
                setMySocialAccounts(response.data);
            }
        };
        fetchSocialAccounts();
    }, []);

    const allPlatforms = [
        {
            name: 'LinkedIn',
            icon: <FaLinkedin className="mr-[8px] text-[#1D4ED8]" />,
            link: `http://localhost:8000/login/linkedin`,
        },
        {
            name: 'Twitter',
            icon: <FaTwitter className="mr-[8px] text-blue-400" />,
            link: `http://localhost:8000/login/twitter`,
        },
    ];

    const handleConnectToSocialAccount = (link) => {
        window.open(link, 'Login', 'width=600,height=600');
    };

    const handleScheduledTime = (scheduledTime) => {
        if (!scheduledTime) {
            scheduledTime = new Date();
            return;
        } else {
            scheduledTime = new Date(scheduledTime);
        }
        setScheduledTime(formatScheduleTime(scheduledTime));
    }

    const onSubmit = async () => {
        if (listPlatforms.length === 0) {
            toast.error("Please select at least one platform.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        setLoading(true);

        const mediaUrls = images.map((image) => URL.createObjectURL(image));

        const response = await createPost(content, mediaUrls, scheduledTime, listPlatforms);

        setLoading(false);
        if (response.status == HttpStatusCode.Ok) {
            toast.success(response.messages[0], {
                position: "top-right",
                autoClose: 3000,
            });
        } else {
            toast.error(response.messages[0], {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const handlePlatformChange = (platform) => {
        const updatedPlatforms = listPlatforms.includes(platform)
            ? listPlatforms.filter((item) => item !== platform)
            : [...listPlatforms, platform];

        setListPlatforms(updatedPlatforms);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = [];
        const newImagePreviews = [];

        files.forEach((file) => {
            if (isValidImageType(file)) {
                newImages.push(file);
                newImagePreviews.push(URL.createObjectURL(file));
            } else {
                e.target.value = null;
                toast.error('Invalid image type. Only JPEG, PNG, GIF, and WEBP are allowed.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        });

        setImages([...images, ...newImages]);
        setImagesPreview([...imagesPreview, ...newImagePreviews]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setImagesPreview(imagesPreview.filter((_, i) => i !== index));
    };

    return (
        <div className="rounded-[8px] bg-white p-[16px]">
            <form>
                <ToastContainer />
                <div className="mb-[16px]">
                    <label htmlFor="content" className="mb-[8px] block text-[16px] text-[#374151]">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        className="h-[100px] w-full rounded-[8px] border-[1px] border-[#D1D5DB] p-[12px_24px] text-[#4B5563] outline-none"
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-[16px] flex items-center">
                    <input
                        id="schedule"
                        type="checkbox"
                        checked={schedule}
                        onChange={() => setSchedule(!schedule)}
                        className="mr-2"
                    />
                    <label htmlFor="schedule">Do you want to schedule this post?</label>
                </div>

                {schedule && (
                    <div className="mb-[16px]">
                        <label htmlFor="schedule_time" className="mb-[8px] block text-[16px] text-[#374151]">
                            Schedule Time
                        </label>
                        <input
                            type="datetime-local"
                            id="schedule_time"
                            value={scheduledTime}
                            className="w-fit rounded-[8px] border-[1px] border-[#D1D5DB] p-[12px_24px] text-[#4B5563] outline-none"
                            onChange={(e) => handleScheduledTime(e.target.value)}
                        />
                    </div>
                )}

                <div>
                    <p className="mb-[8px] block text-[16px] text-[#374151]">Select images</p>
                    <button
                        type="button"
                        className="flex items-center rounded bg-gray-200 p-2 hover:opacity-[0.8]"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <FaUpload className="mr-2" /> Upload Images
                    </button>
                    <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleImageUpload} />

                    {imagesPreview.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-2">
                            {imagesPreview.map((src, index) => (
                                <div key={index} className="relative">
                                    <img src={src} alt="Uploaded" className="h-24 w-24 rounded object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-0 right-0 cursor-pointer rounded-full bg-red-500 p-1 text-white"
                                    >
                                        <FaTimes size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="my-[16px]">
                    <p className="mb-[8px] block text-[16px] text-[#374151]">Select social platform</p>
                    {allPlatforms.map((platform) => {
                        const socialAccount = mySocialAccounts.find((acc) => acc.platform === platform.name.toUpperCase());
                        return (
                            <div key={platform.name} className="mb-2 flex items-center">
                                <input
                                    type="checkbox"
                                    checked={listPlatforms.includes(platform.name.toUpperCase()) && !!socialAccount}
                                    onChange={() => handlePlatformChange(platform.name.toUpperCase())}
                                    disabled={!socialAccount}
                                    className="mr-2"
                                />
                                <label className="flex items-center">
                                    {platform.icon}
                                    <span>{platform.name}</span>
                                </label>
                                {socialAccount ? (
                                    <span onClick={() => handleConnectToSocialAccount(platform.link)} className="ml-4 cursor-pointer text-blue-600">
                                        {socialAccount.screen_name}
                                    </span>
                                ) : (
                                    <span onClick={() => handleConnectToSocialAccount(platform.link)} className="ml-4 cursor-pointer text-blue-600">
                                        Login
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                <button type="button" onClick={onSubmit} disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
                    {loading ? <Loading /> : 'Post Now'}
                </button>
            </form>
        </div>
    );
}
