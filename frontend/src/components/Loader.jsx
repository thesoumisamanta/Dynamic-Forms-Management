import React from 'react';

export default function Loader() {
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-solid border-gray-200"></div>
        </div>
    );
}
