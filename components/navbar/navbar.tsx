"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import logo from "@/public/icons/logo (1).png";
import { IoSettings } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Dropdown } from "./profile-dropdown";
import { useUserStore } from "@/hooks/user-store";
import axios from "axios";
import { Button } from "../ui/button";
import { io } from "socket.io-client";

const Navbar = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-user`,
          { withCredentials: true } // Ensures cookies are sent if using auth
        );
        if (res.status === 200) {
          setUser({
            id: res.data.id,
            fullname: res.data.email,
            isLoggedIn: true,
            username: res.data.username,
            profilePic: res.data.profilePic,
          });
        }
      } catch (error: any) {
        console.error("Failed to fetch user:", error.response?.data || error);
      }
    };
    console.log("hello");

    if (!user.isLoggedIn) fetchUser();
  }, [user.isLoggedIn, setUser]);

  return (
    <div className="w-full">
      <div className="w-5/6 rounded-xl p-2 border-b shadow flex m-auto h-14 items-center justify-between">
        <div className="left flex items-center">
          <Image src={logo} alt="logo" width={70} height={70} />
          <h1 className="text-[26px] font-bold bg-gradient-to-r from-[#088ADD] to-primary bg-clip-text text-transparent">
            vibeWAVE
          </h1>
        </div>
        <div className="flex gap-x-2 text-xl items-center">
          {user.isLoggedIn ? (
            <Dropdown
              options={[
                { icon: MdAccountCircle, name: "Profile" },
                { icon: IoMdLogOut, name: "Log out" },
              ]}
              image={user.profilePic || "https://avatar.iran.liara.run/public"}
              name={user.username || "User"}
            />
          ) : (
            <Button> Login </Button>
          )}
          |
          <IoSettings size={23} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
