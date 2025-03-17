import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';

const Layout = () => {
    return (
        <div className="flex h-screen w-screen overflow-y-scroll bg-[#F3F4F6]">
            <SideBar />
            <div className="flex-1">
                <Header />
                <div className="p-[32px]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
