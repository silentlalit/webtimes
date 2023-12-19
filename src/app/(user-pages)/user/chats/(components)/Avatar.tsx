import React from "react";
import Image from "next/image";

const Avatar = ({ img, online }: any) => {
  return (
    <div style={{ position: "relative" }}>
      <Image
        src={img || "/user.png"}
        width={35}
        height={35}
        alt="user"
        style={{
          borderRadius: "50%",
          border: "1px solid var(--secondary-color)",
        }}
      />
      {online ? (
        <span
          style={{
            position: "absolute",
            width: 10,
            height: 10,
            backgroundColor: "var(--green-color)",
            bottom: 5,
            right: 2,
            borderRadius: "50%",
          }}></span>
      ) : null}
    </div>
  );
};

export default Avatar;
