"use server";

import React from "react";
import Link from "next/link";
import styles from "@/styles/userLoginSignup.module.scss";
import LoginForm from "./LoginForm";

const { main, container } = styles;

const Page = () => {
  return (
    <main className={main}>
      <div className={container}>
        <div style={{ textAlign: "center" }}>
          <h1>
            Sign in to <Link href="/">Webtimes</Link>
          </h1>
          <p>Welcome Back! Please enter your login details</p>
        </div>

        <br />
        <LoginForm />

        <br />
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: 5,
          }}>
          <span style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
          <span>Or Sign in with Google</span>
          <span style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
        </div>
      </div>
    </main>
  );
};

export default Page;
