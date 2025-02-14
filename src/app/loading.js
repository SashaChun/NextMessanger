import React from "react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-background">
            <div className="relative w-40 h-40 bg-gray-800 flex flex-wrap p-2">
                <div className="w-1/2 h-1/2 bg-gray-600 animate-fade opacity-100"
                     style={{animation: "fade 4s infinite ease-in-out 0s"}}></div>
                <div className="w-1/2 h-1/2 bg-gray-500 animate-fade opacity-100"
                     style={{animation: "fade 4s infinite ease-in-out 1s"}}></div>
                <div className="w-1/2 h-1/2 bg-gray-600 animate-fade opacity-100"
                     style={{animation: "fade 4s infinite ease-in-out 3s"}}></div>
                <div className="w-1/2 h-1/2 bg-gray-700 animate-fade opacity-100"
                     style={{animation: "fade 4s infinite ease-in-out 2s"}}></div>
            </div>
        </div>
    );
};

export default Loading;
