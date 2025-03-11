import React from 'react';
import logo from '../assets/logo.jpg';
import { faFacebook, faInstagram, faTwitter, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faCalendar, faChartLine, faI, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import user from '../assets/alvin.png';
const Landing = () => {
    const list_nav = ['Features', 'Pricing', 'Testimonials', 'FAQ'];

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
                <div className="mx-auto flex h-[65px] max-w-[1280px] items-center justify-between px-[16px]">
                    <img className="h-[46px] w-auto" src={logo} />

                    <ul className="flex items-center">
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

                    <div>
                        <a href="/login" className="text-[#4B5563] hover:font-[600] hover:text-[#2563EB]">
                            Sign in
                        </a>

                        <a
                            href="/login"
                            className="ml-[16px] inline-block rounded-[9999px] border-[1px] border-[#E5E7EB] bg-[#2563EB] p-[8px_16px] text-white hover:opacity-[0.9]"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-[1280px]">
                <div className="py-[116px]">
                    <div className="flex flex-col items-center py-[25px]">
                        <h1 className="max-w-[800px] text-center text-[60px] font-bold text-[#111827]">
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
                    <h1 className="text-center text-[36px] font-bold">Everything You Need for Social Media Success</h1>

                    <div className="mt-[56px] grid grid-cols-3 gap-[32px]">
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

                    <div className="mt-[56px] grid grid-cols-3 gap-[32px]">
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
                <div className="mx-auto max-w-[1280px] py-[60px]">
                    <h1 className="text-center text-[36px] font-bold text-white">
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
                <div className="mx-auto max-w-[1280px] p-[50px_16px]">
                    <div className="mb-[32px] grid grid-cols-4 gap-[32px]">
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
