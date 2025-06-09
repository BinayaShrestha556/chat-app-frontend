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
    <div className="w-full py-2">
      <div className="w-full md:w-5/6 rounded-md p-2 px-2.5 flex m-auto h-14 items-center justify-between">
        <div className="left flex gap-1.5 items-center ">
          <Image src={logo} alt="logo" width={45} height={45} />
          <h1 className="text-[26px] font-bold text-black bg-clip-text ">
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
