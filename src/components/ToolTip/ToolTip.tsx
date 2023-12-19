"use client";

import React, { useState } from "react";

const styles = {
  tooltipContainer: {
    position: "relative",
    display: "inline-block",
  } as React.CSSProperties,

  tooltip: {
    position: "absolute",
    top: "calc(-100% - 50px)",
    transform: "translate(-50%)",
    backgroundColor: "rgba(0,0,0, 0.8)",
    color: "white",
    padding: 10,
    borderRadius: 4,
    zIndex: 1,
    maxWidth: 400,
    width: "max-content",
  } as React.CSSProperties,
};

const { tooltipContainer, tooltip } = styles;

type PropsType = {
  text: string;
  children: any;
  style?: React.CSSProperties;
  props?: any;
};

const ToolTip = ({ text, children, style = {}, ...props }: PropsType) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div
      style={tooltipContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}>
      {children}
      {isVisible && <div style={{ ...tooltip, ...style }}>{text}</div>}
    </div>
  );
};

export default ToolTip;
