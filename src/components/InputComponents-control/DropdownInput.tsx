import React from "react";
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
    width: "100%",
    outline: 0,
    transition: "all 100ms",
    backgroundColor: "hsl(0, 0%, 100%)",
    border: "1px solid hsl(0, 0%, 80%)",
    color: "var(--white-color)",
  },
};

const { defaultWrapperStyle, defaultStyle } = styles;

function DropdownInput({
  control,
  name,
  error,
  label,
  options = [],
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
          {label && <label>{label}</label>}
          <select
            style={{ ...defaultStyle, ...style }}
            value={value ? value : ""}
            onChange={(e: any) => {
              onChange(e);
            }}
            {...props}>
            {options.map(({ id, value }: { id: string; value: string }) => (
              <option key={id} value={value}>
                {value}
              </option>
            ))}
          </select>
          {message && <p className="errorStyle">{message}</p>}
        </div>
      )}
    />
  );
}

export default DropdownInput;
