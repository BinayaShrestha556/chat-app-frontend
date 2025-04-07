import Image from "next/image";
import Link from "next/link";
import React from "react";
import google from "@/public/icons/google-icon.png";
import github from "@/public/icons/github-icon.png";

const Socials = () => {
  return (
    <div className="w-full ">
      <Link
        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login/google`}
        className="flex py-2 w-full justify-center text-[13px] gap-2 font-semibold items-center rounded border border-border hover:bg-secondary"
      >
        <Image alt="google icon" src={google} height={20} /> Continue with
        Google
      </Link>
      <Link
        href={`${process.env.BACKEND_URL}/login/google`}
        className="flex py-2 w-full justify-center mt-4 text-[13px] gap-2 font-semibold items-center rounded border border-border hover:bg-secondary"
      >
        <Image alt="google icon" src={github} height={20} /> Continue with
        Github
      </Link>
    </div>
  );
};

export default Socials;
