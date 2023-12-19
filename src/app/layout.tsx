"use client";

import { Fragment, useEffect } from "react";
import { usePathname } from "next/navigation";
import "@/app/globals.css";
import { Footer, Header } from "@/components";
import { Toaster } from "react-hot-toast";

// redux ----------------
import StoreProvider from "@/providers/StoreProvider";
import { loadUser } from "@/redux/slices/authSlice";
import { fetchServices } from "@/redux/slices/servicesSlice";
import { fetchProjects } from "@/redux/slices/projectsSlice";
import { fetchSkills } from "@/redux/slices/skillsSlice";
import { fetchTestimonials } from "@/redux/slices/testimonialsSlice";
import { useAppDispatch } from "@/redux/hook";

// Skeleton styles
import "react-loading-skeleton/dist/skeleton.css";
import "react-vertical-timeline-component/style.min.css";
// Import Swiper styles
import "swiper/css";
// import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html>
      <head />

      <body>
        <StoreProvider>
          {pathname?.match(/^\/userAuth/) ||
          pathname?.match(/^\/user/) ||
          pathname?.match(/^\/cms/) ? (
            <App>{children}</App>
          ) : (
            <>
              <Header />
              <App>{children}</App>
              <Footer />
            </>
          )}

          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={toastOptions}
          />
        </StoreProvider>
      </body>
    </html>
  );
}

const App = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchServices());
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchTestimonials());
  }, [dispatch]);

  return <Fragment>{children}</Fragment>;
};
