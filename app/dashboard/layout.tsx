import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex-1 pb-2 grow flex gap-2  w-5/6 m-auto">
      <div className="h-full w-80 ">
        <Sidebar />
      </div>
      <div className="flex-1 border-[1px] border-border rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default layout;
