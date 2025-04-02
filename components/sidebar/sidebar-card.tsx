import React from "react";
interface SidebarCardProps{
    image:string;
    status:"DELIVERED"|"SEEN"|"NOT SEEN";
    time:string;
    message:string;
}
const SideBarCard = ({image,status,time,message}:SidebarCardProps) => {
  return <div className="h-14 w-full flex items-center relative">
    <Image/>

  </div>;
};

export default SideBarCard;
