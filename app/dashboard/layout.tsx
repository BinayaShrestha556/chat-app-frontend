"use client";
import Navbar from "@/components/navbar/navbar";
import Conversations from "@/components/conversations/conversations";
import { useUserStore } from "@/hooks/user-store";
import { usePathname } from "next/navigation";
import React from "react";
import Sidebar from "@/components/sidebar/sidebar";

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
    <div className="flex-1 h-[calc(100%-80px)]   pb-2 grow flex w-full px-2 m-auto">
      <Navbar />
      <div
        className={`w-full md:w-80  lg:block ${
          pathname == "/dashboard" ? " " : "hidden"
        }`}
      >
        <Conversations />
      </div>
      <div
        className={`flex-1  border-[1px] border-border  overflow-hidden ${
          pathname == "/dashboard" ? "hidden md:block" : " "
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
