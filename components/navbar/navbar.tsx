"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import logo from "@/public/icons/cropped_transparent_black_logo.png";

import { useUserStore } from "@/hooks/user-store";

import { useSocketConnection } from "@/hooks/useSocket-store";
import useFetch, { refresh } from "@/api-fetch/fetch";

import { useRouter } from "next/navigation";
import {
  AiFillBell,
  AiFillHeart,
  AiFillHome,
  AiFillSetting,
  AiOutlineMenuFold,
} from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { useGroupModal } from "@/hooks/use-create-group-modal";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/hooks/sidebar-store";

const Navbar = () => {
  const { user, setUser, setLoading } = useUserStore();
  useSocketConnection();
  const { callServer } = useFetch();

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
        console.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (!user.isLoggedIn) fetchUser();
  }, [user.isLoggedIn, setUser]);

  const onOpen = useGroupModal((state) => state.onOpen);
  const { isOpen, close } = useSidebarStore();

  // Function to handle clicks on the overlay
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click target is exactly the overlay div itself
    // This prevents the sidebar from closing when clicking inside the sidebar content
    if (event.target === event.currentTarget) {
      close();
    }
  };

  return (
    <div className={cn("md:w-16 relative w-0 ")}>
      {/* Overlay for closing the sidebar */}
      {/* Conditionally render the overlay only when the sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-transparent" // Use fixed inset-0 to cover the whole screen, lower z-index than sidebar
          onClick={handleOverlayClick}
        ></div>
      )}

      <div
        className={cn(
          "z-40 bg-white overflow-hidden border transition-all duration-300 h-full flex flex-col shadow absolute",
          isOpen ? "w-64" : "md:w-16 w-0"
        )}
        // Prevent click events from propagating from the sidebar content to the overlay
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-2 z-50 top-4 ">
          <AiOutlineMenuFold
            size={27}
            onClick={close}
            className={cn(
              "transition-all mt-0.5 opacity-0 duration-300",
              isOpen && "opacity-100"
            )}
          />
        </div>
        <div
          className={cn(
            "h-16 flex gap-3 items-center pl-2.5 relative",
            isOpen && "justify-start px-3"
          )}
        >
          <div className="h-[44px] aspect-square relative left-0 top-2">
            <Image src={logo} alt="logo" className="object-fit object-center" />
          </div>
          <h1 className={cn("text-2xl font-bold absolute left-16 ")}>
            VibeWAVE
          </h1>
        </div>
        <div
          className={cn(
            "flex flex-col justify-between flex-grow w-full items-center ",
            isOpen && "items-start"
          )}
        >
          <div
            className={cn(
              " hover:bg-accent w-full h-14 relative flex items-center justify-center ",
              isOpen && "justify-start px-5"
            )}
          >
            <Link
              href={"/dashboard"}
              className="flex gap-4 items-center left-5 absolute cursor-pointer "
            >
              <AiFillHome size={27} />
              <h2 className="font-bold ">Dashboard</h2>
            </Link>
          </div>
          <div
            className={cn(
              " hover:bg-accent w-full h-14 relative flex items-center justify-center ",
              isOpen && "justify-start px-5"
            )}
          >
            <div
              onClick={onOpen}
              className="flex gap-4 items-center left-5 absolute cursor-pointer "
            >
              <AiFillPlusCircle size={27} />
              <h2 className="font-bold text-nowrap">Create group</h2>
            </div>
          </div>
          <div
            className={cn(
              " hover:bg-accent w-full h-14 relative flex items-center justify-center ",
              isOpen && "justify-start px-5"
            )}
          >
            <div className="flex gap-4 items-center left-5 absolute cursor-pointer ">
              <AiFillHeart size={27} />
              <h2 className="font-bold ">Favourates</h2>
            </div>
          </div>
          <div
            className={cn(
              " hover:bg-accent w-full h-14 relative flex items-center justify-center ",
              isOpen && "justify-start px-5"
            )}
          >
            <Link
              href={"/dashboard/notifications"}
              className="flex gap-4 items-center left-5 absolute cursor-pointer "
            >
              <AiFillBell size={27} />
              <h2 className="font-bold ">Notifictions</h2>
            </Link>
          </div>
          <div
            className={cn(
              "  w-full h-14 relative flex flex-grow items-end pb-3 justify-center ",
              isOpen && "justify-start px-5 "
            )}
          >
            <Link
              href={"/dashboard/settings"}
              className="flex gap-4 items-center left-5 absolute cursor-pointer "
            >
              <AiFillSetting size={27} />
              <h2 className="font-bold ">Settings</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
