"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import logo from "@/public/icons/logo (1).png";

import { MdAccountCircle } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Dropdown } from "./profile-dropdown";
import { useUserStore } from "@/hooks/user-store";

import { Button } from "../ui/button";

import { useSocketConnection } from "@/hooks/useSocket-store";
import useFetch, { refresh } from "@/api-fetch/fetch";
import { RiLoader2Line } from "react-icons/ri";
import { pacifico } from "@/app/font";
import { AxiosError } from "axios";

const Navbar = () => {
  const { user, setUser } = useUserStore();
  useSocketConnection();
  const { callServer, loading } = useFetch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await refresh();
        const data = await callServer("/auth/get-user", "GET");
        if (data)
          setUser({
            id: data.id,
            fullname: data.email,
            isLoggedIn: true,
            username: data.username,
            profilePic: data.profilePic,
          });
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data?.error || "Something went wrong");
        } else {
          console.log("An unknown error occurred");
        }
      }
    };

    if (!user.isLoggedIn) fetchUser();
  }, [user.isLoggedIn, setUser]);
  const options = [
    { icon: MdAccountCircle, name: "Profile", onClick: () => {} },
    {
      icon: IoMdLogOut,
      name: "Log out",
      onClick: async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        window.location.pathname = "/";
      },
    },
  ];
  return (
    <div className="w-full px-2">
      <div className="w-full md:w-5/6 rounded-md p-2 border-b shadow-sm flex m-auto h-14 items-center justify-between">
        <div className="left flex items-center">
          <Image src={logo} alt="logo" width={70} height={70} />
          <h1 className="text-[26px] font-bold bg-gradient-to-r from-[#088ADD] to-primary bg-clip-text text-transparent">
            <span className={pacifico.className}>vibe</span>WAVE
          </h1>
        </div>
        <div className="flex gap-x-2 text-xl items-center">
          {user.isLoggedIn ? (
            <Dropdown
              options={options}
              image={user.profilePic || "https://avatar.iran.liara.run/public"}
              name={user.username || "User"}
            />
          ) : (
            <Button>
              {" "}
              {loading ? (
                <RiLoader2Line className="animate-spin" />
              ) : (
                "Login"
              )}{" "}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
