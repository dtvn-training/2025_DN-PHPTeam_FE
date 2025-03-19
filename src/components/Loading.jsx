import React from 'react';

const Loading = () => {
    return (
        <div
            className="inline-block h-[24px] w-[24px] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );
};

export default Loading;
