"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";

import axios, { AxiosError } from "axios";

const LoginForm = () => {
  const [pending, setTransition] = useTransition();
  const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [error, setError] = useState("");
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setTransition(async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
          values,
          { withCredentials: true }
        );

        if (response.status === 200) window.location.pathname = "/";
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.error || "Something went wrong");
        } else {
          setError("An unknown error occurred");
        }
      }
    });
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className=" h-full flex flex-col w-full justify-center  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-6 "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm ">Username</FormLabel>
                <FormControl>
                  <Input className="rounded" disabled={pending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm ">Password</FormLabel>
                <FormControl>
                  <Input
                    className="rounded"
                    disabled={pending}
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <p className="text-red-500 -mt-4 -mb-4 text-sm font-semibold">
              {error}
            </p>
          )}
          <Link
            href={"/"}
            className="text-[13px] text-center w-fit self-center text-foreground/90 font-semibold"
          >
            Fogot password?
          </Link>

          <Button>Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
