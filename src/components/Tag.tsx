import React from "react";

const styles = {
  defaultStyle: {
    backgroundColor: "var(--lightGray-color)",
    color: "var(--black-color)",
    padding: "3px 8px",
    fontSize: 12,
    borderRadius: 8,
  },
};

function Tag({ text, style, ...props }: any) {
  return (
    <span style={{ ...styles.defaultStyle, ...style }} {...props}>
      {text}
    </span>
  );
}

export default Tag;
