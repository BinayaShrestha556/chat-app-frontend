import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="w-full sm:w-80 h-screen bg-white shadow-lg flex flex-col rounded-xl overflow-hidden border border-gray-100">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="w-full h-14 bg-accent-100 rounded-lg animate-shine flex items-center space-x-4 p-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>

            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>

          <div className="w-full h-14 bg-accent-100 rounded-lg animate-shine flex items-center space-x-4 p-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-3 bg-gray-300 rounded w-2/5"></div>
            </div>
          </div>

          <div className="w-full h-14 bg-accent-100 rounded-lg animate-shine flex items-center space-x-4 p-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-4/5"></div>
              <div className="h-3 bg-gray-300 rounded w-3/5"></div>
            </div>
          </div>

          <div className="w-full h-14 bg-accent-100 rounded-lg animate-shine flex items-center space-x-4 p-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>

          <div className="w-full h-14 bg-accent-100 rounded-lg animate-shine flex items-center space-x-4 p-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>

          <div className="w-full h-14 bg-accent-100 rounded-lg animate-shine flex items-center space-x-4 p-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-3 bg-gray-300 rounded w-2/5"></div>
            </div>
          </div>
        </div>
        \
      </div>
    </div>
  );
};

export default Loading;
