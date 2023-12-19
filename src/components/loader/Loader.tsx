import React from "react";
import styles from "./Loader.module.scss";

const { loading } = styles;

const Loader = ({ style }: any) => {
  return (
    <div className={loading}>
      <span style={style}>{}</span>
    </div>
  );
};

export default Loader;
