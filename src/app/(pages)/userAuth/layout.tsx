"use client";

import styles from "@/styles/userLoginSignup.module.scss";
const { loginSignupContainer, videoWrapper, loginSignupPage } = styles;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={loginSignupContainer}>
      <div className={videoWrapper}>
        <video
          onLoadStart={(e: any) => (e.playbackRate = 2)}
          autoPlay
          muted
          loop>
          <source src="/videos/login-signup03.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={loginSignupPage}>{children}</div>
    </div>
  );
};

export default Layout;
