import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const styles = {
  defaultWrapperStyle: {
    width: "100%",
    margin: 10,
    marginLeft: 0,
  },
};

const { defaultWrapperStyle } = styles;

function TextInput({ label, wrapperStyle = {}, style = {}, ...props }: any) {
  return (
    <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
      {label && <label>{label}</label>}
      <Rating items={5} isRequired style={{ maxWidth: 250 }} {...props} />
    </div>
  );
}

export default TextInput;
