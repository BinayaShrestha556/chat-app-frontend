"use client";
import Image from "next/image";
import React from "react";
import { BiInfoCircle } from "react-icons/bi";
interface TopPartProps {
  image?: { pfp: string; id: string }[];
  name: string;
  loading: boolean;
}
const TopPart = ({ image, name, loading }: TopPartProps) => {
  console.log("hhhhhhhhhhh");
  if (loading) return <div className="w-full h-14 border-b animate-ping"></div>;
  else console.log(image);
  return (
    <div className="w-full flex h-14  items-center px-5  border-b justify-between">
      <div className="flex items-center h-14 gap-2">
        <div className="relative h-12 w-12 aspect-square rounded-full ">
          {image &&
            (image.length === 1 ? (
              <Image
                src={image[0].pfp}
                alt="pfp"
                fill
                className="object-center object-cover"
              />
            ) : (
              <div className="h-full relative aspect-square ">
                <div className="relative  h-[70%] w-[70%] -right-1  ">
                  {" "}
                  <Image
                    alt="pfp 1"
                    src={image[0].pfp}
                    fill
                    className="object-center object-cover"
                  />
                </div>
                <div className="relative -top-6 h-[75%] w-[75%]  left-3 ">
                  {" "}
                  <Image
                    alt="pfp 1"
                    src={image[1].pfp}
                    fill
                    className="object-center object-cover"
                  />
                </div>
              </div>
            ))}
        </div>
        <span className="text-semibold text-lg">{name}</span>
      </div>
      <BiInfoCircle className="text-black/80 text-2xl " />
    </div>
  );
};

export default TopPart;
