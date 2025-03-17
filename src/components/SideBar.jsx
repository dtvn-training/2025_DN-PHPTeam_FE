import React from 'react';
import logo from '../assets/logo.jpg';
import { faPlus, faClockRotateLeft, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideBarLink from './SideBarLink';
import { Link } from 'react-router-dom';
const SideBar = () => {
    const listNavigations = [
        {
            label: 'Create Post',
            path: '/',
            icon: <FontAwesomeIcon icon={faPlus} />,
        },
        {
            label: 'View History',
            path: '/viewhistory',
            icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
        },
        {
            label: 'Interaction',
            path: '/interaction',
            icon: <FontAwesomeIcon icon={faChartSimple} />,
        },
    ];
    return (
        <div className="sticky top-0 flex h-full w-[256px] flex-col border-r-[1px] border-[#E5E7EB] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-center py-[25px]">
                <Link to="/">
                    <img src={logo} alt="" className="h-auto w-[186px]" />
                </Link>
            </div>

            <div className="my-[24px] flex flex-col gap-[8px] px-[16px]">
                {listNavigations.map((item) => (
                    <SideBarLink item={item} key={item.label} />
                ))}
            </div>
        </div>
    );
};

export default SideBar;
