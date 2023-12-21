"use client";
import React from "react";
import { Controller } from "react-hook-form";

const styles = {
  labelStyle: {
    fontSize: 16,
  },
  defaultWrapperStyle: {
    width: "100%",
    margin: 10,
    marginLeft: 0,
  },
  defaultStyle: {
    padding: "8px 15px",
    borderRadius: 4,
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
    outline: 0,
    transition: "all 100ms",
    backgroundColor: "hsl(0, 0%, 100%)",
    border: "1px solid hsl(0, 0%, 80%)",
    height: 150,
    color: "var(--white-color)",
  },
};

const { labelStyle, defaultWrapperStyle, defaultStyle } = styles;

function TextareaInput({
  control,
  name,
  error,
  label,
  wrapperStyle = {},
  style = {},
  ...props
}: any) {
  const { message } = error || {};

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
          {label && <label style={labelStyle}>{label}</label>}
          <textarea
            value={value ? value : ""}
            onChange={(e: any) => {
              onChange(e);
            }}
            {...props}
            style={{ ...defaultStyle, ...style }}
          />
          {message && <p className="errorStyle">{message}</p>}
        </div>
      )}
    />
  );
}

export default TextareaInput;
