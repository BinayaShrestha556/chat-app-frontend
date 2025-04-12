"use client";
import Sidebar from "@/components/sidebar/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <div className="flex-1 h-[calc(100%-80px)]   pb-2 grow flex gap-2 w-full px-2 md:w-5/6 m-auto">
      <div
        className={`w-full md:w-80  lg:block ${
          pathname == "/dashboard" ? " " : "hidden"
        }`}
      >
        <Sidebar />
      </div>
      <div
        className={`flex-1  border-[1px] border-border rounded-md overflow-hidden ${
          pathname == "/dashboard" ? "hidden md:block" : " "
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default layout;
