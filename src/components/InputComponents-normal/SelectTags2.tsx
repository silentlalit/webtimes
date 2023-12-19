"use client";

import React, { useEffect, useState } from "react";
import Tag from "../Tag";

const styles = {
  defaultWrapperStyle: {
    width: "100%",
    margin: 10,
    marginLeft: 0,
    cursor: "pointer",
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  defaultStyle: {
    backgroundColor: "var(--white-color)",
    color: "var(--white-color)",
    padding: "8px 10px",
    fontSize: 16,
    borderRadius: 5,
    boxShadow: "0px 0px 1px var(--exLightGray-color)",
  },
};

const { defaultWrapperStyle, defaultStyle } = styles;

type Option = {
  label: string;
  value: string;
};

function SelectTags({
  label,
  placeholder,
  wrapperStyle = {},
  style = {},
  isMulti = false,
  selected = [],
  options = [],
  onChange,
  ...props
}: any) {
  const [selectedTags, setSelectedTags] = useState<Option[]>(selected);

  useEffect(() => {
    setSelectedTags(selected);
  }, [selected]);

  const isSelected = (item: Option) =>
    selectedTags.find((option) => option.value === item.value);

  const handleSelect = (option: Option) => {
    if (isMulti) {
      setSelectedTags((prev) => {
        return isSelected(option)
          ? prev.filter((s) => s !== option)
          : [...prev, option];
      });
    } else {
      isSelected(option) ? setSelectedTags([]) : setSelectedTags([option]);
    }
  };

  useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags, onChange]);

  return (
    <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
      {label && <label>{label}</label>}

      {options.map((option: Option, idx: number) => (
        <Tag
          key={idx}
          text={option.value}
          style={{
            ...defaultStyle,
            backgroundColor: isSelected(option)
              ? "var(--primary-color)"
              : "var(--white-color)",
            color: "var(--black-color)",
          }}
          onClick={() => handleSelect(option)}
          {...props}
        />
      ))}
    </div>
  );
}

export default SelectTags;
