import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.jpg';
import { faFacebook, faInstagram, faTwitter, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faCalendar, faChartLine, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import user from '../assets/alvin.png';
import { Dropdown } from 'antd';
const Landing = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const list_nav = ['Features', 'Pricing', 'Testimonials', 'FAQ'];
    const items_mobile_nav = [
        {
            key: '1',
            label: <a href="#">Features</a>,
        },
        {
            key: '2',
            label: <a href="#">Pricing</a>,
        },
        {
            key: '3',
            label: <a href="#">Testimonials</a>,
        },
        {
            key: '4',
            label: <a href="#">FAQ</a>,
        },
        {
            key: '5',
            label: <a href="/login">Login</a>,
        },
    ];
    const list_social = [
        <FontAwesomeIcon icon={faFacebook} className="text-[#2563EB]" size="2xl" />,
        <FontAwesomeIcon icon={faInstagram} className="text-[#DB2777]" size="2xl" />,
        <FontAwesomeIcon icon={faTwitter} className="text-[#60A5FA]" size="2xl" />,
        <FontAwesomeIcon icon={faLinkedin} className="text-[#1D4ED8]" size="2xl" />,
        <FontAwesomeIcon icon={faTiktok} className="text-[#111827]" size="2xl" />,
    ];

    const list_benefit = [
        {
            icon: <FontAwesomeIcon icon={faCalendar} />,
            title: 'Smart Scheduling',
            desc: 'Schedule posts at optimal times for maximum engagement across all platforms',
        },
        {
            icon: <FontAwesomeIcon icon={faChartLine} />,
            title: 'Analytics & Insights',
            desc: 'Track performance metrics and get detailed reports for all your social accounts',
        },
        {
            icon: <FontAwesomeIcon icon={faUsers} />,
            title: 'Team Collaboration',
            desc: 'Work seamlessly with your team members on content creation and approval',
        },
    ];

    const list_user = [
        {
            avatar: user,
            name: 'Sarah Johnson',
            position: 'Marketing Director',
            comment:
                '"This tool has revolutionized how we manage our social media presence. The scheduling features are incredibly intuitive."',
        },
        {
            avatar: user,
            name: 'Mike Thompson',
            position: 'Social Media Manager',
            comment:
                '"The analytics features provide invaluable insights that have helped us improve our social media strategy."',
        },
        {
            avatar: user,
            name: 'Emily Chen',
            position: 'Content Creator',
            comment:
                '"The team collaboration features make it so easy to work with clients and get approval on content."',
        },
    ];

    return (
        <div>
            <div className="border-b-[1px] border-[#F3F4F6] bg-white">
                <div className="mx-auto flex h-[65px] items-center justify-between px-[16px] max-sm:px-[24px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1024px] 2xl:max-w-[1280px]">
                    <img className="h-[46px] w-auto" src={logo} />

                    <div className="block sm:hidden">
                        <Dropdown
                            menu={{
                                items: items_mobile_nav,
                            }}
                            open={open}
                        >
                            <FontAwesomeIcon icon={faBars} onClick={() => setOpen((prev) => !prev)} />
                        </Dropdown>
                    </div>

                    <ul className="hidden items-center sm:flex">
                        {list_nav &&
                            list_nav.map((item, index) => (
                                <li
                                    className="px-[16px] text-[#4B5563] hover:font-[600] hover:text-[#2563EB]"
                                    key={index}
                                >
                                    <a href="#">{item}</a>
                                </li>
                            ))}
                    </ul>

                    <div className="hidden sm:block">
                        <a href="/login" className="text-[#4B5563] hover:font-[600] hover:text-[#2563EB]">
                            Login
                        </a>

                        <a
                            href="/register"
                            className="ml-[16px] hidden rounded-[9999px] border-[1px] border-[#E5E7EB] bg-[#2563EB] p-[8px_16px] text-white hover:opacity-[0.9] lg:inline-block"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-sm:px-[24px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1024px] 2xl:max-w-[1280px]">
                <div className="py-[116px]">
                    <div className="flex flex-col items-center py-[25px]">
                        <h1 className="max-w-[800px] text-center text-[40px] font-bold text-[#111827] sm:text-[48px] md:text-[54px] lg:text-[60px]">
                            Manage All Your Social Media Posts in One Place
                        </h1>
                        <p className="mt-[32px] max-w-[900px] text-center text-[20px] text-[#4B5563]">
                            Schedule, publish, and analyze your content across multiple social platforms with one
                            powerful tool
                        </p>
                        <div className="mt-[40px] flex items-center justify-center">
                            <a
                                className="inline-block rounded-[9999px] border-[1px] border-[#E5E7EB] bg-[#2563EB] p-[16px_40px] text-white hover:opacity-[0.9]"
                                href="/login"
                            >
                                Start Free Trial
                            </a>
                        </div>

                        <ul className="mt-[52px] flex items-center justify-center">
                            {list_social &&
                                list_social.map((item, index) => (
                                    <li className="px-[16px]" key={index}>
                                        {item}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                <div className="py-[60px]">
                    <h1 className="text-center text-[30px] font-bold sm:text-[36px]">
                        Everything You Need for Social Media Success
                    </h1>

                    <div className="mt-[56px] grid grid-cols-1 gap-[32px] md:grid-cols-2 lg:grid-cols-3">
                        {list_benefit &&
                            list_benefit.map((item, index) => (
                                <div key={index} className="rounded-[16px] bg-[#F9FAFB] p-[16px_24px]">
                                    <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#DBEAFE] text-[20px] text-[#2563EB]">
                                        {item.icon}
                                    </div>
                                    <h2 className="my-[16px] text-[20px] font-bold">{item.title}</h2>
                                    <p className="w-[80%] text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                    </div>
                </div>

                <div className="py-[60px]">
                    <h1 className="text-center text-[36px] font-bold">Trusted by Social Media Managers</h1>

                    <div className="mt-[56px] grid grid-cols-1 gap-[32px] md:grid-cols-2 lg:grid-cols-3">
                        {list_user &&
                            list_user.map((item, index) => (
                                <div key={index} className="rounded-[16px] bg-[#F9FAFB] p-[16px_24px]">
                                    <div className="flex">
                                        <img
                                            className="mr-[16px] h-[48px] w-[48px] rounded-full"
                                            src={item.avatar}
                                            alt="#"
                                        />
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-[#4B5563]">{item.position}</p>
                                        </div>
                                    </div>
                                    <p className="mt-[16px] w-[90%] text-[#4B5563]">{item.comment}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#2563EB]">
                <div className="mx-auto py-[60px] max-sm:px-[24px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1024px] 2xl:max-w-[1280px]">
                    <h1 className="text-center text-[36px] font-bold text-white max-sm:text-[30px]">
                        Ready to Transform Your Social Media Management?
                    </h1>
                    <p className="mt-[40px] text-center text-[20px] text-[#DBEAFE]">
                        Join thousands of social media managers who trust our platform
                    </p>
                    <div className="mt-[40px] flex items-center justify-center">
                        <a
                            className="inline-block rounded-[9999px] border-[1px] border-[#E5E7EB] bg-white p-[19px_40px] text-[#2563EB] hover:opacity-[0.9]"
                            href="/login"
                        >
                            Start Free Trial
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-[#111827]">
                <div className="mx-auto p-[50px_16px] max-sm:px-[24px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1024px] 2xl:max-w-[1280px]">
                    <div className="mb-[32px] grid grid-cols-2 gap-[32px] lg:grid-cols-3 xl:grid-cols-4">
                        <div>
                            <h2 className="text-[18px] font-bold text-white">SocialSync</h2>
                            <p className="mt-[24px] text-[#9CA3AF]">
                                Making social media management simple and effective
                            </p>
                            <ul className="mt-[24px] flex items-center">
                                <li className="mr-[16px] text-[16px] text-[#9CA3AF]">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </li>
                                <li className="mr-[16px] text-[16px] text-[#9CA3AF]">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </li>
                                <li className="mr-[16px] text-[16px] text-[#9CA3AF]">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </li>
                                <li className="mr-[16px] text-[16px] text-[#9CA3AF]">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-[18px] font-bold text-white">Product</h2>
                            <ul className="mt-[24px]">
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">Features</a>
                                </li>
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">Pricing</a>
                                </li>
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">Integration</a>
                                </li>
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">API</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-[18px] font-bold text-white">Resources</h2>
                            <ul className="mt-[24px]">
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">Blog</a>
                                </li>
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">Help Center</a>
                                </li>
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">Guides</a>
                                </li>
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">Case Studies</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-[18px] font-bold text-white">Company</h2>
                            <ul className="mt-[24px]">
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">About</a>
                                </li>
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">Careers</a>
                                </li>
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">Contact</a>
                                </li>
                                <li className="mt-[8px] text-[16px] text-[#9CA3AF]">
                                    <a href="#">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t-[1px] border-[#1F2937] pt-[32px] text-center text-[#9CA3AF]">
                        © 2025 SocialSync. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
