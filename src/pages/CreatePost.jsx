import { useState, useRef, useEffect } from 'react';
import { FaFacebook, FaLinkedin, FaReddit, FaTwitter, FaUpload, FaTimes } from 'react-icons/fa';
import { isValidImageType } from '../utils/ValidationImageType';
import { getSocialAccountsOfUser } from '../services/socialAccountService';
import { postToLinkedin } from '../services/postService';
import { notification } from 'antd';
import Loading from '../components/Loading';
export default function CreatePost() {
    const accessToken = localStorage.getItem('access_token');
    const [errorScheduleTime, setErrorScheduleTime] = useState('');
    const [errorPlatform, setErrorPlatform] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const fileInputRef = useRef(null);
    const [schedule, setSchedule] = useState(false);
    const [content, setContent] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [imagesPreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState([]);
    const [listSocialAccount, setListSocialAccount] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchSocialAccounts();
    }, []);

    const fetchSocialAccounts = async () => {
        const response = await getSocialAccountsOfUser();
        if (response && response.status === 200) {
            setListSocialAccount((prev) => [...prev, ...response.data.data]);
        }
    };

    const list_platform = [
        {
            name: 'Facebook',
            icon: <FaFacebook className="mr-[8px] text-[#2563EB]" />,
            link: '#',
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin className="mr-[8px] text-[#1D4ED8]" />,
            link: `http://localhost:8000/login/linkedin?access-token=${accessToken}`,
        },
        {
            name: 'Reddit',
            icon: <FaReddit className="mr-[8px] text-[#EA580C]" />,
            link: '#',
        },
        {
            name: 'Twitter',
            icon: <FaTwitter className="mr-[8px] text-blue-400" />,
            link: `http://localhost:8000/login/twitter?access-token=${accessToken}`,
        },
    ];

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== 'http://localhost:8000') return;

            const { socialAccount } = event.data;
            if (socialAccount) {
                console.log(socialAccount);
                setListSocialAccount((prev) => [
                    ...prev,
                    {
                        screen_name: socialAccount.screen_name,
                        platform: socialAccount.platform,
                    },
                ]);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);
    const handleLogin = async (link) => {
        const popup = window.open(link, 'Login', 'width=600,height=600');
    };

    const onSubmit = async () => {
        // const selectedTime = new Date(scheduleTime);
        // const now = Date.now();
        // if (schedule) {
        //     if (!scheduleTime) {
        //         setErrorScheduleTime('Invalid schedule time.');
        //         return;
        //     } else if (selectedTime <= now) {
        //         setErrorScheduleTime('Schedule time must be in the future.');
        //         return;
        //     } else {
        //         setErrorScheduleTime('');
        //     }
        // }

        // if (selectedPlatform.length === 0) {
        //     setErrorPlatform('Please select at least one platform.');
        //     return;
        // } else {
        //     setErrorPlatform('');
        // }

        // const request = {
        //     content,
        //     listPlatforms: selectedPlatform,
        //     mediaUrls: images,
        //     scheduledTime: schedule
        //         ? selectedTime.toLocaleString('sv-SE').replace('T', ' ')
        //         : new Date().toLocaleString('sv-SE').replace('T', ' '),
        // };
        // console.log(imagesPreview);
        // console.log(request);
        setLoading(true);
        try {
            // console.log(images);
            const response = await postToLinkedin(content, images);
            console.log(response);
            if (response.data.status === 422) {
                notification.open({
                    type: 'error',
                    message: 'Post fail',
                    description: 'Please check the information again.',
                    duration: 2,
                });
            } else if (response.data.data.status === 422) {
                notification.open({
                    type: 'error',
                    message: 'Post fail',
                    description: 'Duplicated post.',
                    duration: 2,
                });
            } else if (response.data.status === 200) {
                setContent('');
                setImages([]);
                setImagesPreview([]);
                notification.open({
                    type: 'success',
                    message: 'Post successfully',
                    description: 'Post successfully',
                    duration: 2,
                });
            }
        } catch (e) {
            console.log(e);
            if (e.response.data.status === 400) {
                notification.open({
                    type: 'error',
                    message: 'Post fail',
                    description: 'Please login with linkedin to post.',
                    duration: 2,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const getSocialAccountOfUser = (platform) => {
        return listSocialAccount && listSocialAccount.find((value) => value.platform === platform.toUpperCase());
    };

    const handlePlatformChange = (platform) => {
        const updatedPlatforms = selectedPlatform.includes(platform)
            ? selectedPlatform.filter((item) => item !== platform)
            : [...selectedPlatform, platform];
        setSelectedPlatform(updatedPlatforms);
        if (updatedPlatforms.length > 0) setErrorPlatform('');
    };

    const handleImageUpload = (e) => {
        setErrorImage('');
        const files = Array.from(e.target.files);
        const newImages = [];
        const newImagePreviews = [];

        files.forEach((element) => {
            if (isValidImageType(element)) {
                newImages.push(element);
                const previewUrls = URL.createObjectURL(element);
                newImagePreviews.push(previewUrls);
            } else {
                e.target.value = null;
                setErrorImage('Invalid image. Select image valid type (JPEG, PNG, GIF, WEBP)');
            }
        });

        setImages([...images, ...newImages]);
        setImagesPreview([...imagesPreview, ...newImagePreviews]);
    };

    const removeImage = (index) => {
        setImagesPreview(imagesPreview.filter((_, i) => i !== index));
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="rounded-[8px] bg-white p-[16px]">
            <form>
                <div className="mb-[16px]">
                    <label htmlFor="content" className="mb-[8px] block text-[16px] text-[#374151]">
                        Content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        value={content}
                        className="h-[100px] w-full rounded-[8px] border-[1px] border-[#D1D5DB] p-[12px_24px] text-[#4B5563] outline-none"
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
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
                            value={scheduleTime}
                            className="w-[20%] rounded-[8px] border-[1px] border-[#D1D5DB] p-[12px_24px] text-[#4B5563] outline-none"
                            onChange={(e) => {
                                setScheduleTime(e.target.value);
                            }}
                        />

                        {errorScheduleTime && <p className="mt-[8px] text-sm text-red-500">{errorScheduleTime}</p>}
                    </div>
                )}

                <div>
                    <p className="mb-[8px] block text-[16px] text-[#374151]">Select images</p>
                    <div className="w-full">
                        <button
                            type="button"
                            className="flex cursor-pointer items-center rounded bg-gray-200 p-2 hover:opacity-[0.8]"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <FaUpload className="mr-2" /> Upload Images
                        </button>

                        {errorImage && <p className="mt-[8px] text-sm text-red-500">{errorImage}</p>}
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                        />

                        {imagesPreview.length > 0 && (
                            <div className="mt-4 grid grid-cols-16 gap-2">
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
                </div>

                <div className="my-[16px]">
                    <p className="mb-[8px] block text-[16px] text-[#374151]">Select social platform</p>
                    <div>
                        {list_platform.map((platform, index) => {
                            const socialAccount = getSocialAccountOfUser(platform.name);
                            return (
                                <div key={index} className="mb-2 flex items-center">
                                    <input
                                        id={platform.name}
                                        value={platform.name}
                                        checked={
                                            selectedPlatform.includes(platform.name.toUpperCase()) &&
                                            socialAccount !== undefined
                                        }
                                        onChange={() => handlePlatformChange(platform.name.toUpperCase())}
                                        type="checkbox"
                                        disabled={socialAccount === undefined && true}
                                        className="mr-2"
                                    />
                                    <label className="flex items-center" htmlFor={platform.name}>
                                        {platform.icon}
                                        <span>{platform.name}</span>
                                    </label>
                                    {socialAccount === undefined ? (
                                        <span
                                            onClick={() => handleLogin(platform.link)}
                                            className="ml-[16px] cursor-pointer text-[#2563EB]"
                                        >
                                            Login
                                        </span>
                                    ) : (
                                        <span className="ml-[16px] text-[#2563EB]">{socialAccount.screen_name}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {errorPlatform && <p className="mt-[8px] text-sm text-red-500">{errorPlatform}</p>}
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={loading}
                        className="w-[30%] cursor-pointer rounded bg-[#2563EB] p-2 text-center text-white hover:opacity-[0.9]"
                    >
                        {loading ? <Loading /> : 'Post Now'}
                    </button>
                </div>
            </form>
        </div>
    );
}
