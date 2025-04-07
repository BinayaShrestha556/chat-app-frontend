"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import Link from "next/link";

const SignupForm = () => {
  const [pending, setTransition] = useTransition();
  const loginSchema = z.object({
    fullname: z.string().email(),
    password: z.string().min(6),
    username: z.string().min(3),
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      fullname: "",
      password: "",
      username: "",
    },
  });
  const onSubmit = async () => {
    try {
    } catch (error) {}
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
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm ">Email</FormLabel>
                <FormControl>
                  <Input
                    className="rounded"
                    disabled={pending}
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

          <Button className="">Sign up</Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
