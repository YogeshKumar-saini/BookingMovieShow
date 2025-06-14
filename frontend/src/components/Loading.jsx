import React from 'react';

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] space-y-4">
      <div className="relative">
        <div className="h-14 w-14 border-4 border-gray-300 rounded-full" />
        <div className="absolute top-0 left-0 h-14 w-14 border-4 border-t-primary border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin" />
      </div>
      <p className="text-sm text-gray-400 font-medium">{text}</p>
    </div>
  );
};

export default Loading;
