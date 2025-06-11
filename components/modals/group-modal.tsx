"use client";
import React, { useRef } from "react";

import { useGroupModal } from "@/hooks/use-create-group-modal";
import { Modal } from "../ui/modal";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiLoader2Line } from "react-icons/ri";

import { cn } from "@/lib/utils";
import { SearchData } from "../conversations/top";
import Image from "next/image";
import useFetch from "@/api-fetch/fetch";
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";
import { useUserStore } from "@/hooks/user-store";
const AppModal = () => {
  const [searchData, setSearchData] = useState<SearchData[] | null>();
  const [addedUser, setAddedUser] = useState<SearchData[]>([]);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const groupModal = useGroupModal();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { callServer, loading, error } = useFetch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log(newValue);
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
  const addUser = (user: SearchData) => {
    if (!addedUser.some((e) => e.id === user.id))
      setAddedUser([...addedUser, user]);
  };
  const removeUser = (user: SearchData) => {
    setAddedUser((current) => current.filter((e) => e.id !== user.id));
  };
  const { onClose } = useGroupModal();
  const { user } = useUserStore();
  const onSubmit = async () => {
    try {
      const formattedUsers = addedUser.map((e) => e.id);
      const members = [...formattedUsers, user.id];
      await callServer("/messages/create-conversation", "POST", {
        users: members,
      });
    } catch (err) {
      console.log(err);
      toast.error(error);
    }
  };
  return (
    <Modal
      title="Create your group"
      isOpen={groupModal.isOpen}
      onClose={groupModal.onClose}
      description="Add new members to your group!"
    >
      <div className="flex gap-2 items-center">
        <Input
          onChange={onChange}
          placeholder="Search users"
          onFocus={() => setVisible(true)}
        />
        {visible ? (
          <TiDelete size={35} onClick={() => setVisible(false)} />
        ) : (
          <AiOutlineSearch
            size={25}
            className="cursor-pointer"
            onClick={() => setVisible(true)}
          />
        )}
      </div>
      <div className="relative">
        {visible && value.length > 0 && (
          <div
            className={cn(
              "w-60 py-2 absolute top-2 left-[50%] bg-white border rounded-lg shadow-xl"
            )}
          >
            {loading ? (
              <div className="flex items-center bg-white z-50  gap-1 p-2">
                loading
                <span>
                  <RiLoader2Line className="animate-spin" />
                </span>
              </div>
            ) : searchData && searchData.length > 0 ? (
              <div className="flex flex-col gap-y-2">
                {searchData.map((e) => (
                  <div
                    key={e.id}
                    className="flex p-3 gap-2 hover:bg-primary/60 cursor-pointer"
                    onClick={() => addUser(e)}
                  >
                    <div className="relative h-10 aspect-square">
                      <Image
                        src={e.profilePic}
                        fill
                        alt="pfp"
                        className="object-center object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{e.username}</h3>
                      <p className="text-muted-foreground text-sm">
                        {e.fullname}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-accent-foreground text-sm p-2">
                No result found
              </p>
            )}
          </div>
        )}
      </div>
      {addedUser.length > 0 && (
        <div className="w-full border px-3 mt-5 rounded p-2 ">
          <span className="text-sm font-semibold">Selected users:</span>
          {addedUser.length > 0 ? (
            addedUser.map((e) => (
              <div key={e.id} className="w-full flex items-center">
                <div className="relative h-8 aspect-square">
                  <Image
                    src={e.profilePic}
                    alt="pfp"
                    fill
                    className="object-center object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="text-sm font-semibold">{e.username}</p>
                  <span className="text-sm text-muted-foreground">
                    {e.fullname}
                  </span>
                </div>
                <div className="flex flex-grow items-center justify-end">
                  <TiDelete
                    size={25}
                    className="text-red-500"
                    onClick={() => removeUser(e)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground ml-2 text-sm">
              No user selected
            </p>
          )}
        </div>
      )}
      <div className="flex justify-end gap-3 w-full mt-5">
        <Button
          onClick={onClose}
          className="hover:bg-secondary/50"
          variant={"outline"}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={loading}>
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default AppModal;
