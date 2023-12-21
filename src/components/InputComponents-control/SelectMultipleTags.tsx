"use client";

import React, { useId, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const styles = {
  defaultWrapperStyle: {
    width: "100%",
    margin: 10,
    marginLeft: 0,
  },
  // defaultStyle: {
  //   padding: "8px 15px",
  //   borderRadius: 10,
  //   fontSize: 16,
  //   fontWeight: "500",
  //   width: "100%",
  //   backgroundColor: "var(--black-color)",
  // },
};

const { defaultWrapperStyle } = styles;

function SelectMultipleTags({
  control,
  name,
  error,
  label,
  placeholder,
  wrapperStyle = {},
  style = {},
  selected = [],
  options = [],
  disabled = false,
  ...props
}: any) {
  const { message } = error || {};
  const [selectedOption, setSelectedOption] = useState<any>(selected);
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <div
          style={{
            ...defaultWrapperStyle,
            ...wrapperStyle,
            pointerEvents: disabled ? "none" : "all",
          }}>
          {label && <label>{label}</label>}
          <Select
            instanceId={id}
            selectedValue={selectedOption}
            value={selectedOption}
            onChange={(option: any) => {
              setSelectedOption(option);
              onChange(option);
            }}
            options={options}
            theme={(theme) => ({
              ...theme,
              borderRadius: 4,
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(0, 0%, 80%)",
              colors: {
                ...theme.colors,
                neutral0: "var(--white-color)",
                primary25: "var(--gray-color)",
              },
            })}
            {...props}
          />
          {message && <p className="errorStyle">{message}</p>}
        </div>
      )}
    />
  );
}

export default SelectMultipleTags;
