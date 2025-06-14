import React from "react";

const page = () => {
  return (
    <div className="w-full flex flex-col h-full">
      <div className="w-full h-14 flex items-center px-4 border-b">
        <h2 className="text-xl font-semibold">Notifications</h2>
      </div>
      <div className="flex-grow flex items-center text-muted-foreground justify-center">
        No new notifications
      </div>
    </div>
  );
};

export default page;
