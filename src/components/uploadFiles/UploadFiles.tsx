"use client";

import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoAlertCircle } from "react-icons/io5";
import { BsFillCloudUploadFill, BsFillXCircleFill } from "react-icons/bs";
import { Loader } from "@/components";
import styles from "./uploadFiles.module.scss";
import File from "./File";
import toast from "react-hot-toast";

const {
  uploadFiles,
  filesToUpload,
  showUploadFailed,
  closeAll,
  uploadFiles_container,
} = styles;

const UploadFiles = ({
  images = [],
  uploadImages,
  deleteImage,
  replaceImage,
}: any) => {
  const [resultUrls, setResultUrls] = useState<
    { status: string; value: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFilesUplaod = async (e: any) => {
    const filesArr: File[] = Array.from(e.target.files);
    if (!filesArr.length) return;

    setIsLoading(true);

    const { success, message, error, result } = await uploadImages(filesArr);

    if (success) {
      toast.success(message);
      setResultUrls(result);
      setIsLoading(false);
    } else {
      toast.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={uploadFiles}>
      <div className={filesToUpload}>
        <label
          htmlFor="uploadFiles"
          style={isLoading ? { opacity: 0.5, pointerEvents: "none" } : {}}>
          <input
            type="file"
            accept="image/*"
            multiple
            id="uploadFiles"
            name="uploadFiles"
            onChange={handleFilesUplaod}
          />
          <BsFillCloudUploadFill size={40} color="#313bac" />
          <span>Upload Files here</span>
        </label>

        <div className={showUploadFailed}>
          <div className={closeAll}>
            <span>Results</span>

            <span onClick={() => setResultUrls([])}>
              <BsFillXCircleFill size={20} />
              clear all
            </span>
          </div>

          {isLoading ? (
            <Loader style={{ width: "5vmax", height: "5vmax" }} />
          ) : (
            resultUrls?.map((res, idx) =>
              res.status === "fulfilled" ? (
                <div key={idx}>
                  <AiFillCheckCircle size={20} color="#228b22" />
                  <span>{res.value}</span>
                </div>
              ) : (
                <div key={idx}>
                  <IoAlertCircle size={20} color="#c41604" />
                  <span>{res.value}</span>
                </div>
              )
            )
          )}
        </div>
      </div>

      <div className={uploadFiles_container}>
        {images.map((image: string, idx: number) => (
          <File
            key={idx}
            idx={idx}
            image={image}
            replaceImage={replaceImage}
            deleteImage={deleteImage}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadFiles;
