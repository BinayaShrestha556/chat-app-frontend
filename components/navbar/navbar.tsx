"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import logo from "@/public/icons/cropped_transparent_black_logo.png";
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
import { useRouter } from "next/navigation";
import {
  AiFillBell,
  AiFillHeart,
  AiFillHome,
  AiFillSetting,
} from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";

const Navbar = () => {
  const { user, setUser, setLoading } = useUserStore();
  useSocketConnection();
  const { callServer, loading } = useFetch();

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

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
        else {
          router.push("/auth/login");
        }
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data?.error || "Something went wrong");
          router.push("/auth/login");
        } else {
          console.log("An unknown error occurred");
          router.push("/auth/login");
        }
        setLoading(false);
      } finally {
        setLoading(false);
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
    <div className=" px-3 border h-full flex flex-col shadow">
      <div className="h-16 flex items-center justify-center">
        <div className="w-12 relative ">
          <Image src={logo} alt="logo" className="object-fit object-center" />
        </div>
      </div>
      <div className="flex flex-col justify-between flex-grow w-full  items-center gap-6">
        <div className="">
          <AiFillHome size={27} />
        </div>
        <div>
          <AiFillPlusCircle size={27} />
        </div>
        <div>
          <AiFillHeart size={27} />
        </div>
        <div>
          <AiFillBell size={27} />
        </div>
        <div className="flex-grow flex items-end py-4">
          <AiFillSetting size={27} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
