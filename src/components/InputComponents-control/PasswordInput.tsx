"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const styles = {
  defaultWrapperStyle: {
    width: "100%",
    margin: 10,
    marginLeft: 0,
  },
  defaultStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    padding: "8px 15px",
    borderRadius: 4,
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
    transition: "all 100ms",
    backgroundColor: "hsl(0, 0%, 100%)",
    border: "1px solid hsl(0, 0%, 80%)",
  },
};

const { defaultWrapperStyle, defaultStyle } = styles;

function PasswordInput({
  control,
  name,
  error,
  wrapperStyle = {},
  style = {},
  label,
  ...props
}: any) {
  const [showPassword, setShowPassword] = useState(false);
  const { message } = error || {};

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
          {label && <label>{label}</label>}
          <div style={{ ...defaultStyle, ...style }}>
            <input
              value={value ? value : ""}
              onChange={(e: any) => {
                onChange(e);
              }}
              type={showPassword ? "text" : "password"}
              style={{ outline: 0, width: "100%", height: "100%" }}
              {...props}
            />
            {showPassword ? (
              <FaRegEye size={18} onClick={() => setShowPassword(false)} />
            ) : (
              <FaRegEyeSlash size={18} onClick={() => setShowPassword(true)} />
            )}
          </div>
          {message && <p className="errorStyle">{message}</p>}
        </div>
      )}
    />
  );
}

export default PasswordInput;
