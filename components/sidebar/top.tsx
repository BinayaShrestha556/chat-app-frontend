"use client";
import React, { useRef, useState } from "react";

import { BiSearch } from "react-icons/bi";
import { cn } from "@/lib/utils";
import SearchUserCard from "./searchUserCard";
import useFetch from "@/api-fetch/fetch";

import { RiLoader2Line } from "react-icons/ri";
export interface SearchData {
  id: string;
  fullname: string;
  gender: string;
  profilePic: string;
  username: string;
}
const Top = ({ fn }: { fn: () => Promise<void> }) => {
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
  const ref = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);

  if (error) return error;
  return (
    <div
      onFocus={() => setVisible(true)}
      onBlur={() => {
        setTimeout(() => {
          setVisible(false);
        }, 250);
      }}
      className="w-full rounded-lg group  z-50 h-10 items-center p-3 relative flex gap-2"
    >
      <h3
        className={cn(
          "font-bold text-xl overflow-hidden transition-all",
          visible ? "w-0" : "w-full"
        )}
      >
        Conversations
      </h3>
      <input
        ref={ref}
        className={cn(
          "focus:outline-0 flex-1 px-2 py-1 border-b placeholder:text-accent-foreground transition-all ease-in-out duration-500 ",
          visible ? "w-full opacity-100" : "opacity-0 w-0"
        )}
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
      <BiSearch
        className="absolute right-3"
        size={23}
        onClick={() => {
          setVisible((e) => !e);
          ref.current?.focus();
        }}
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
                <SearchUserCard {...e} fn={fn} key={e.id} />
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
