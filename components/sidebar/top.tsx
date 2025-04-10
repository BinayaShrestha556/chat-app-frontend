"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { BiSearch } from "react-icons/bi";
import { cn } from "@/lib/utils";
import SearchUserCard from "./searchUserCard";
import useFetch from "@/api-fetch/fetch";
import { LoaderIcon } from "lucide-react";
import { RiLoader2Line } from "react-icons/ri";
export interface SearchData {
  id: string;
  fullname: string;
  gender: string;
  profilePic: string;
  username: string;
}
const Top = () => {
  const [searchData, setSearchData] = useState<SearchData[] | null>();
  const { callServer, error, loading } = useFetch();
  const [value, setValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (newValue.trim() !== "") {
        const data = await callServer(`/user/search?q=${newValue}`, "GET");
        setSearchData(data);
      } else {
        setSearchData(null);
      }
    }, 500); // 500ms delay (adjust as needed)
  };
  const [visible, setVisible] = useState(false);
  return (
    <div
      onFocus={() => setVisible(true)}
      onBlur={() => {
        setTimeout(() => {
          setVisible(false);
        }, 500);
      }}
      className="w-full rounded-lg group bg-accent z-50 h-10 items-center p-2 relative flex gap-2"
    >
      <BiSearch size={23} />
      <input
        className="focus:outline-0 flex-1 placeholder:text-accent-foreground"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
      {(visible || loading) && (
        <div
          className={cn(
            "w-60 p-2 absolute top-[120%] backdrop-blur rounded-lg shadow"
          )}
        >
          {loading ? (
            <div className="flex items-center text-accent-foreground gap-1">
              loading
              <span>
                <RiLoader2Line className="animate-spin" />
              </span>
            </div>
          ) : searchData && searchData.length > 0 ? (
            <div className="flex flex-col gap-y-2">
              {searchData.map((e) => (
                <SearchUserCard {...e} key={e.id} />
              ))}
            </div>
          ) : (
            <p className="text-accent-foreground text-sm">No result found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Top;
