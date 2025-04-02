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
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginForm = () => {
  const [pending, setTransition] = useTransition();
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setTransition(async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
          values,
          { withCredentials: true }
        );

        if (response.status === 200) router.push("/");
      } catch (error: any) {
        setError(error.response.data.message);
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
            name="email"
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
          <Button
            type="button"
            onClick={async () => {
              const res = await axios.get("http://localhost:3000/user/status", {
                withCredentials: true,
              });

              console.log(res.data);
            }}
          >
            test
          </Button>

          <Button>Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
