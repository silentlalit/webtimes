"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import styles from "./uploadFiles.module.scss";
import toast from "react-hot-toast";

const { fileBox, fileEditDelete } = styles;

const File = ({ image, idx, replaceImage, deleteImage }: any) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<string>();

  useEffect(() => {
    setFile(image);
  }, [image]);

  const handleReplaceImage = async (file: File, image: string) => {
    if (!image || !file) return;

    setLoading(true);
    const data = await replaceImage(image, file);

    if (data.success) {
      toast.success(data.message);
      setLoading(false);
    } else {
      toast.error(data.error);
      setLoading(false);
    }
  };

  const handleDeleteImage = async (filename: string) => {
    if (!filename) return;

    setLoading(true);

    const data = await deleteImage(filename);

    if (data.success) {
      toast.success(data.message);
      setLoading(false);
    } else {
      toast.error(data.error);
      setLoading(false);
    }
  };

  return (
    <div
      className={fileBox}
      style={loading ? { opacity: 0.5, pointerEvents: "none" } : {}}>
      <div className={fileEditDelete}>
        <label htmlFor={`replaceImage${idx}`}>
          <AiFillEdit size={20} style={{ cursor: "pointer" }} />
          <input
            type="file"
            accept="image/*"
            id={`replaceImage${idx}`}
            onChange={(e: any) => handleReplaceImage(e.target.files[0], image)}
          />
        </label>

        <AiFillDelete
          size={20}
          style={{ cursor: "pointer" }}
          onClick={() => handleDeleteImage(image)}
        />
      </div>

      <Image
        src={`/upload/services/${image}`}
        width={185}
        height={200}
        alt={"image"}
      />
    </div>
  );
};

export default File;
