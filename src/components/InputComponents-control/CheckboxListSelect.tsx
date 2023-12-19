"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";

const styles = {
  defaultWrapperStyle: {
    width: "100%",
    margin: 10,
    marginLeft: 0,
  },
  defaultStyle: {
    display: "flex",
    gap: 15,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    cursor: "pointer",
  },

  checkBox: {
    width: 40,
    padding: "8px 15px",
    borderRadius: 4,
    outline: 0,
    transition: "all 100ms",
    backgroundColor: "hsl(0, 0%, 100%)",
    border: "1px solid hsl(0, 0%, 80%)",
  },
};

const { defaultWrapperStyle, defaultStyle, checkBox } = styles;

type CheckList = {
  id: string;
  value: string;
};

function CheckboxInput({
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
  const [checkedList, setCheckedList] = useState<CheckList[]>([]);

  const handleCheck = (event: any, onChange: any) => {
    let handleChecked = [...checkedList];

    if (event.target.checked) {
      handleChecked = [...handleChecked, JSON.parse(event.target.value)];
    } else {
      handleChecked = handleChecked.filter(
        (pr) => pr.id !== JSON.parse(event.target.value).id
      );
    }

    setCheckedList(handleChecked);
    onChange(handleChecked);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value: lastValues } }) => {
        return (
          <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
            <label htmlFor="checkboxInput">{label}</label>
            {options.map(({ id, value }: CheckList) => (
              <div key={id} style={{ ...defaultStyle, ...style }}>
                <input
                  id={`checkbox${id}`}
                  value={JSON.stringify({ id, value })}
                  onChange={(e) => handleCheck(e, onChange)}
                  type="checkbox"
                  defaultChecked={lastValues.find((val: any) => val.id === id)}
                  style={checkBox}
                  {...props}
                />
                <label htmlFor={`checkbox${id}`}>{value}</label>
              </div>
            ))}
            {message && <p className="errorStyle">{message}</p>}
          </div>
        );
      }}
    />
  );
}

export default CheckboxInput;
