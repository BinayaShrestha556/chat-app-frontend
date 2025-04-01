import Socials from "@/components/socials";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center  justify-center">
      <div className="w-2/3 flex flex-col gap-y-6">
        <div className="mb-4">
          <h1 className="text-2xl self-start font-bold ">
            Create a new account
          </h1>
          <h2 className="text-sm ">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-semibold">
              Login
            </Link>
          </h2>
        </div>
        <Socials />
        <span className="text-center text-sm text-muted-foreground -mb-1">
          OR
        </span>
      </div>
    </div>
  );
};

export default page;
