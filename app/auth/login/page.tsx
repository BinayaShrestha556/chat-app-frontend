import LoginForm from "@/components/login-form";
import Socials from "@/components/socials";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="w-full flex flex-col items-center  justify-center">
      <div className="w-2/3 flex flex-col gap-y-6">
        <div className="mb-4">
          <h1 className="text-2xl self-start font-bold ">
            Login to your account
          </h1>
          <h2 className="text-sm ">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary font-semibold">
              Sign up
            </Link>
          </h2>
        </div>
        <Socials />
        <span className="text-center text-sm text-muted-foreground -mb-1">
          OR
        </span>
        <LoginForm />
      </div>
    </div>
  );
}

export default page;
