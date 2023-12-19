"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";

const styles: any = {
  labelStyle: {
    fontSize: 18,
  },
  defaultWrapperStyle: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: 10,
    marginLeft: 0,
  },
  imagesBox: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    zIndex: 1,
  },
  deleteImage: {
    position: "absolute",
    top: 0,
    zIndex: 2,
    right: 0,
    cursor: "pointer",
  },
};

const { labelStyle, defaultWrapperStyle, imagesBox, deleteImage } = styles;

function MultiFileSelect({
  control,
  name,
  error,
  placeholder,
  label,
  wrapperStyle = {},
  style = {},
  file = [],
  ...props
}: any) {
  const { message } = error || {};
  const [images, setImages] = useState<string[]>(file);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
            {label && (
              <label htmlFor="myfile" style={labelStyle}>
                {label}
              </label>
            )}
            <input
              type="file"
              id="myfile"
              name="myfile"
              multiple
              value={value?.name}
              title="Choose a video please"
              onChange={(e: any) => {
                const filesArr: File[] = Array.from(e.target.files);

                filesArr.forEach((file) => {
                  const reader = new FileReader();

                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setImages((old: any) => [...old, reader.result]);
                    }
                  };
                  reader.readAsDataURL(file);
                });

                onChange(filesArr);
              }}
              {...props}
              style={style}
            />
            <ImagesContainer images={images} setImages={setImages} />
            {message && <p className="errorStyle">{message}</p>}
          </div>
        );
      }}
    />
  );
}

const ImagesContainer = ({ images, setImages }: any) => (
  <div style={imagesBox}>
    {images.map((image: any, idx: number) => (
      <div
        key={image + idx}
        className="image_wrapper"
        style={{
          width: 100,
          height: 80,
        }}>
        <span style={deleteImage}>
          <AiFillDelete
            onClick={() =>
              setImages((prev: string[]) => prev.filter((pre) => pre !== image))
            }
          />
        </span>
        <Image
          src={image}
          fill
          sizes="200px"
          alt="upload a pictute"
          style={{ objectFit: "contain" }}
        />
      </div>
    ))}
  </div>
);

export default MultiFileSelect;
