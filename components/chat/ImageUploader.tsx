"use client";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { BiCross } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";

const CLOUD_NAME = "dtnzu6ts5";
const UPLOAD_PRESET = "spkd0oze";

const ImageUploader = ({
  setUrl,
  url,
}: {
  url: string | null;
  setUrl: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      setUrl(res.data.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div className="w-full bg-white rounded-xl max-w-md mx-auto flex flex-col gap-4 h-48">
      {!url && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
          ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"}
        `}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            {isDragActive
              ? "Drop the image here..."
              : "Drag & drop or click to select an image"}
          </p>
        </div>
      )}
      {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}

      {url && (
        <div className="flex flex-col items-center relative h-full w-48">
          <p className="text-sm text-gray-600 mb-2">Uploaded Image:</p>
          <Image
            src={url}
            fill
            alt="Uploaded"
            className="rounded-lg shadow w-full  object-cover object-center"
          />
          <TiDelete
            className="absolute cursor-pointer  top-1 right-1 shadow-xl text-red-500 "
            size={23}
            onClick={() => setUrl(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
