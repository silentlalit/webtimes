import React from "react";
import Loader from "../loader/Loader";

const LoadingUser = () => {
  return (
    <div
      style={{
        margin: "auto",
        maxWidth: 400,
        border: "1px solid var(--secondary-color)",
        padding: 20,
        borderRadius: 10,
      }}>
      <p style={{ marginTop: 0, marginBottom: 20 }}>
        user is authenticating... Please wait
      </p>
      <Loader />
    </div>
  );
};

export default LoadingUser;
