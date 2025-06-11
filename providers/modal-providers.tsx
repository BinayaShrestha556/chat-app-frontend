"use client";
import AppModal from "@/components/modals/group-modal";
import React, { useEffect, useState } from "react";

const ModalProviders = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <div>
      <AppModal />
    </div>
  );
};

export default ModalProviders;
