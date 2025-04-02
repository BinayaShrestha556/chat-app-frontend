"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import loginIllustration from "@/public/login_image_svg.svg";
import { usePathname } from "next/navigation";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  console.log(pathname);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="flex h-full">
      <div className="w-[40%] bg-[#2E2CE7] p-10 flex flex-col justify-around">
        <div>
          <h1 className="text-5xl font-bold text-white text-center">
            {" "}
            {pathname === "/auth/login" ? "WELCOME BACK!" : "WELCOME!!"}
          </h1>
          <h2 className="text-center text-sm font-semibold mt-2 text-accent-foreground">
            {pathname === "/auth/login"
              ? "Connect instantly with friends—log in to start chatting!"
              : "Join the conversation—sign up and start chatting today!"}
          </h2>
        </div>
        <Image alt="hello" src={loginIllustration} priority />
      </div>
      <div className=" w-[60%] h-full flex items-center">{children}</div>
    </div>
  );
};

export default layout;
