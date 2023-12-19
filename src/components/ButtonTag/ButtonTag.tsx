import React from "react";
import styles from "./buttonTag.module.scss";

const { buttonTag } = styles;

function ButtonTag({ icon, text, disabled, style, ...props }: any) {
  return (
    <div
      className={buttonTag}
      style={{
        color: disabled && "var(--white-color)",
        ...style,
      }}
      {...props}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default ButtonTag;
