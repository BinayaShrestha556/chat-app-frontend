"use server";

import { cookies } from "next/headers";
export const saveCookies = async (access: string, refresh: string) => {
  //this sets access token after i get it fron backend and i pass it to this function
  const cookieStore = await cookies();
  cookieStore.set({
    name: "access_token",
    value: access,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/", // Optional: default is '/'
    maxAge: 60 * 60,
  });
  cookieStore.set({
    name: "refresh_token",
    value: refresh,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/", // Optional: default is '/'
    maxAge: 60 * 60 * 24 * 30,
  });
};
export const setAccessToken = async (access: string) => {
  //this is to set access token only when it refreshes in the client side, so we have same access token set by the backend and the frontend.
  const cookieStore = await cookies();
  cookieStore.set({
    name: "access_token",
    value: access,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/", // Optional: default is '/'
    maxAge: 60 * 60,
  });
};
