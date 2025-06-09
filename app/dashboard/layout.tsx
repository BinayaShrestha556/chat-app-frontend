"use client";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { useUserStore } from "@/hooks/user-store";
import { usePathname } from "next/navigation";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const { loading } = useUserStore();
  if (loading)
    return (
      <div className="w-full h-full items-center justify-center flex text-accent-foreground text-xl font-bold ">
        LOADING....
      </div>
    );
  return (
    <div className="h-full">
      <Navbar />
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
    </div>
  );
};

export default Layout;
