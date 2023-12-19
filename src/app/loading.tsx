"use client";

import React from "react";

function loading() {
  return (
    <div>
      <video
        onLoadStart={(e: any) => (e.playbackRate = 2)}
        autoPlay
        muted
        loop
        style={{ width: "100%", height: "100%" }}>
        <source src="/videos/comming_soon.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default loading;
