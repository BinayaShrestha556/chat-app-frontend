import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex-1 grow flex- w-5/6 m-auto">
      <div className="bg-gray-500 border rounded-xl h-full w-80">
        {children}
      </div>
    </div>
  );
};

export default layout;
