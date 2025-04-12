import React from "react";
import { SearchData } from "./top";
import Image from "next/image";
import useFetch from "@/api-fetch/fetch";
import { useUserStore } from "@/hooks/user-store";
import { useRouter } from "next/navigation";
import { RiLoader2Line } from "react-icons/ri";

const SearchUserCard: React.FC<SearchData> = ({
  fullname,

  id,
  profilePic,
  username,
}) => {
  const { callServer, error, loading } = useFetch();
  const { user } = useUserStore();
  const router = useRouter();
  const onclick = async () => {
    const data = await callServer(`/messages/create-conversation`, "POST", {
      users: [user.id, id],
    });

    router.push(`/dashboard/${data.id}`);
  };
  return (
    <div
      onClick={onclick}
      className="w-full flex hover:bg-secondary cursor-pointer h-12  p-1 rounded-md bg-white/50 items-center gap-2"
    >
      <div className="h-full relative aspect-square rounded-full">
        <Image
          src={profilePic}
          alt="pfp"
          fill
          className="object-cover object-center"
        />
      </div>
      <div>
        <div className="text-semibold">{username}</div>
        <div className="text-sm text-accent-foreground -mt-0.5">{fullname}</div>
      </div>
      {loading && <RiLoader2Line className="animate-spin" />}
    </div>
  );
};

export default SearchUserCard;
