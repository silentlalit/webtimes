import React from "react";

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
    marginTop: 8,
  },
};

const { defaultWrapperStyle, defaultStyle } = styles;

function TextInput({ wrapperStyle = {}, style = {}, label, ...props }: any) {
  return (
    <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
      {label && <label>{label}</label>}
      <input style={{ ...defaultStyle, ...style }} {...props} />
    </div>
  );
}

export default TextInput;
