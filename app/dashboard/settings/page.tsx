"use client";
import { Button } from "@/components/ui/button";
import { removeCookies } from "@/server-actions/login";
import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`
      );
      await removeCookies();
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-5 ">
      <h1 className="text-3xl font-bold border-b w-full">Settings</h1>
      <div className="mt-5 border rounded-xl p-5">
        <h2 className=" text-lg font-medium">Want to log out?</h2>
        <Button
          variant={"destructive"}
          disabled={loading}
          className="m-3"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default page;
