import Image from "next/image";
import React from "react";
import { BiInfoCircle } from "react-icons/bi";
interface TopPartProps {
  image: string | string[] | null;
  name: string;
  loading: boolean;
}
const TopPart = ({ image, name, loading }: TopPartProps) => {
  if (loading) return <div className="w-full h-14 border-b animate-ping"></div>;
  return (
    <div className="w-full flex h-14  items-center px-5  border-b justify-between">
      <div className="flex items-center h-14 gap-2">
        <div className="relative h-12 w-12 aspect-square rounded-full overflow-hidden">
          {image && !Array.isArray(image) && (
            <Image
              src={image}
              alt="pfp"
              fill
              className="object-center object-cover"
            />
          )}
        </div>
        <span className="text-semibold text-lg">{name}</span>
      </div>
      <BiInfoCircle className="text-black/80 text-2xl " />
    </div>
  );
};

export default TopPart;
