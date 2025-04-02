import Image from "next/image";
import React from "react";
import logo from "@/public/icons/logo (1).png";
import { IoSettings } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Dropdown } from "./profile-dropdown";

const Navbar = () => {
  const options = [
    {
      icon: MdAccountCircle,
      name: "Profile",
    },
    {
      icon: IoMdLogOut,
      name: "Log out",
    },
  ];
  return (
    <div className="w-full mt-2 ">
      <div className="w-5/6  rounded-xl p-2  flex m-auto h-14 items-center justify-between">
        <div className="left flex items-center ">
          <Image src={logo} alt="logo" height={70} />
          <h1 className="text-[26px] font-bold bg-gradient-to-r from-[#088ADD] to-primary bg-clip-text text-transparent">
            vibeWAVE
          </h1>
        </div>
        <div className="flex gap-x-2 text-xl items-center">
          <Dropdown
            options={options}
            image="https://picsum.photos/200"
            name="Binaya Shrestha"
          />{" "}
          |
          <IoSettings size={23} className="text-primary" />
          {/* <MdAccountCircle size={25} className="text-primary" /> */}
          {/* <IoMdLogOut size={25} className="text-primary" /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
