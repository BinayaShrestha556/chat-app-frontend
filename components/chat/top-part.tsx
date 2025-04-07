import Image from "next/image";
import React from "react";
interface TopPartProps {
  image: string | string[] | null;
  name: string;
}
const TopPart = ({ image, name }: TopPartProps) => {
  return (
    <div className="w-full flex h-14 px-2 bg-accent border-b ">
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
    </div>
  );
};

export default TopPart;
