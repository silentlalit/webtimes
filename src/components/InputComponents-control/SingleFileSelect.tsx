"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Controller } from "react-hook-form";

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
  },
};

const { labelStyle, defaultWrapperStyle, imagesBox } = styles;

function SingleFileSelect({
  control,
  name,
  error,
  label,
  wrapperStyle = {},
  style = {},
  file = "",
  url = "",
  ...props
}: any) {
  const { message } = error || {};
  const [image, setImage] = useState<string>(file);
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    setImage(file);
    return () => setImage("");
  }, [file]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
          {label && <label style={labelStyle}>{label}</label>}
          <input
            type="file"
            id="myfile"
            name="myfile"
            value={value?.filename}
            onChange={(e: any) => {
              const file = e.target.files[0];
              let reader = new FileReader();
              reader.readAsDataURL(file);

              reader.onload = (e) => {
                setImage(`${e.target?.result}`);
                setFlag(true);
                onChange(file);
              };
            }}
            {...props}
            style={style}
          />
          {image && (
            <div
              className="image_wrapper"
              style={{
                width: 200,
                height: 100,
              }}>
              <Image
                src={flag ? image : url + image}
                fill
                sizes="200px"
                alt="upload a pictute"
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
          {message && <p className="errorStyle">{message}</p>}
        </div>
      )}
    />
  );
}

export default SingleFileSelect;
