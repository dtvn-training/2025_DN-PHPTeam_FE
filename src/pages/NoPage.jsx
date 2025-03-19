import React from 'react';

const NoPage = () => {
    return (
        <div className="mx-auto grid h-screen place-items-center px-8 text-center">
            <div>
                <h1 className="text-[60px] text-red-500">404 Error</h1>
                <a href="/" className="w-full px-4 text-[#2563EB] md:w-[8rem]">
                    Back home
                </a>
            </div>
        </div>
    );
};

export default NoPage;
