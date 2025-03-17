import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBarLink = ({ item }) => {
    const { pathname } = useLocation();
    return (
        <Link
            to={item.path}
            className={`block p-[12px_12px] text-[16px] text-[#374151] ${pathname === item.path && 'rounded-[8px] bg-[#F3F4F6]'}`}
        >
            <span className="mr-[10px]">{item.icon}</span>
            {item.label}
        </Link>
    );
};

export default SideBarLink;
