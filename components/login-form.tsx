"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
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
  const onSubmit = async () => {};
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
