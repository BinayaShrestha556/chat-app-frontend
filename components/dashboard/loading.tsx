import Image from "next/image";
import React from "react";
import logo from "@/public/icons/cropped_transparent_black_logo.png";

const Loading = () => {
  return (
    <div className="w-full h-[100dvh] flex items-center justify-center gap-2">
      <div className="relative w-20 ">
        <Image alt="logo" src={logo} className=" object-fit object-center" />
      </div>
      <h1 className="text-3xl text-bold">VibeWAVE</h1>
    </div>
  );
};

export default Loading;
