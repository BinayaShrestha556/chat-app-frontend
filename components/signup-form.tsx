"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
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
import axios from "axios";

const SignupForm = () => {
  const loginSchema = z.object({
    fullname: z.string().min(1),
    password: z.string().min(6),
    username: z.string().min(3),
    gender: z.string().min(1),
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      fullname: "",
      password: "",
      username: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);

    try {
      console.log(values);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
        values
      );
      window.location.pathname = "/";
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
                <FormLabel className="text-sm ">Fullname</FormLabel>
                <FormControl>
                  <Input className="rounded" disabled={loading} {...field} />
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
                  <Input className="rounded" disabled={loading} {...field} />
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
                    disabled={loading}
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Gender</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    disabled={loading}
                    className="rounded w-full border px-3 py-2 text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
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
