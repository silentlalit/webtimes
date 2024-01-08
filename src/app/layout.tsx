"use client";

import React, { Fragment, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import 'aos/dist/aos.css';

import "@/app/globals.css";
import { Footer, Header } from "@/components";

// redux ----------------
import StoreProvider from "@/providers/StoreProvider";
import { loadUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

// Skeleton styles
import "react-loading-skeleton/dist/skeleton.css";
import "react-vertical-timeline-component/style.min.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { ThemeProvider } from "@/providers/ThemeProvider";

const toastOptions = {
  // Define default options
  className: "",
  duration: 5000,
  style: {
    background: "#363636",
    color: "#fff",
  },

  // Default options for specific types
  success: {
    duration: 5000,
    theme: {
      primary: "green",
      secondary: "black",
    },
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html>
      <head />

      <body>
        <ThemeProvider>
          <StoreProvider>
            {pathname?.match(/^\/userAuth/) ||
            pathname?.match(/^\/user/) ||
            pathname?.match(/^\/cms/) ? (
              <App>{children}</App>
            ) : (
              <Fragment>
                <Header />
                <App>{children}</App>
                <Footer />
              </Fragment>
            )}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;

const App = ({ children }: { children: React.ReactNode }) => {
  const {isAuthenticated} = useAppSelector(state => state.authUser)
  const dispatch = useAppDispatch();

  useEffect(() => {
    AOS.init();
    
    !isAuthenticated && dispatch(loadUser());
  }, [dispatch, isAuthenticated]);

  return (
    <Fragment>
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={toastOptions}
      />
    </Fragment>
  );
};
