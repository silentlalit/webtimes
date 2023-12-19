import React, { useEffect } from "react";
import { Controller } from "react-hook-form";

const styles = {
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
    width: 25,
    outline: 0,
    transition: "all 100ms",
    backgroundColor: "hsl(0, 0%, 100%)",
    border: "1px solid hsl(0, 0%, 80%)",
    marginRight: 10,
  },
};

const { defaultWrapperStyle, defaultStyle } = styles;

function CheckboxInput({
  control,
  name,
  error,
  setShow,
  placeholder,
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
          <input
            type="checkbox"
            id="checkboxInput"
            value={value ? value : false}
            checked={value ? value : false}
            onChange={(e: any) => {
              onChange(e);
              setShow(() => e.target.checked);
            }}
            style={{ ...defaultStyle, ...style }}
            {...props}
          />
          <label htmlFor="checkboxInput">{label || placeholder}</label>
          {message && <p className="errorStyle">{message}</p>}
        </div>
      )}
    />
  );
}

export default CheckboxInput;
