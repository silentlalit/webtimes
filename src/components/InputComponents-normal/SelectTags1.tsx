"use client";

import React, { useId } from "react";
import Select from "react-select";

const styles = {
  defaultWrapperStyle: {
    width: "100%",
    margin: 10,
    marginLeft: 0,
  },
  defaultStyle: {
    padding: "8px 15px",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
  },
};

const { defaultWrapperStyle, defaultStyle } = styles;

function SelectMultipleTags({
  label,
  placeholder,
  wrapperStyle = {},
  style = {},
  selected = [],
  options = [],
  ...props
}: any) {
  return (
    <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
      {label && <label>{label}</label>}
      <Select
        instanceId={useId()}
        selectedValue={selected}
        value={selected}
        options={options}
        styles={{ ...defaultStyle, ...style }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            neutral0: "var(--white-color)",
            primary25: "var(--gray-color)",
          },
        })}
        {...props}
      />
    </div>
  );
}

export default SelectMultipleTags;
