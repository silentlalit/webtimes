"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const styles = {
  defaultWrapperStyle: {
    width: "100%",
    margin: 10,
    marginLeft: 0,
  },
};

const { defaultWrapperStyle } = styles;

function TextInput({
  control,
  name,
  error,
  placeholder,
  label,
  wrapperStyle = {},
  style = {},
  ...props
}: any) {
  const { message } = error || {};
  const [rating, setRating] = useState<number>(0);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
          {label && <label>{label}</label>}
          <Rating
            value={value || 0}
            onChange={(e: any) => {
              onChange(e);
              setRating(e);
            }}
            items={5}
            isRequired
            style={{ maxWidth: 250 }}
            {...props}
          />
          {message && <p className="errorStyle">{message}</p>}
        </div>
      )}
    />
  );
}

export default TextInput;
