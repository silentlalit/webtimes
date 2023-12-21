import { headers } from "next/headers";
import "@/app/globals.css";
import { Footer, Header } from "@/components";
import { Toaster } from "react-hot-toast";

// redux ----------------
import StoreProvider from "@/providers/StoreProvider";
import App from "./App";

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

function RootLayout({ children }: { children: React.ReactNode }) {
  const heads = headers();
  const pathname = heads.get("next-url");

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

export default RootLayout;
