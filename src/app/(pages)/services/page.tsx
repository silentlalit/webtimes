import React from "react";
import styles from "@/styles/servicesPage.module.scss";

// redux
import {
  FaqsSection,
  GetStarted,
  Prefooter,
  ServiceIndustries,
} from "@/container";
import FetchServices from "./FetchServices";

const {
  main,
  container,
  serviceHeader,
  serviceHeader_text,
  serviceHeader_video,
  servicesWrapper,
  servicesWrapper_title,
} = styles;

function Page() {
  return (
    <div className={main}>
      <div className={serviceHeader}>
        <div className={`${container} dContainer`}>
          <div className={serviceHeader_text}>
            <h4 className="topTag">VAIL OUR</h4>
            <h1>End-to-end Website services to stay ahead</h1>
            <p>
              From web designing to developing, webdew is here for all kinds of
              website services you need.
            </p>

            <p>review-star (4.9 out of 5 Ratings)</p>
          </div>

          <div className={serviceHeader_video}>
            <video
              // onLoadStart={(e: any) => (e.playbackRate = 2)}
              autoPlay
              muted
              loop>
              <source src="/videos/services1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <section className={servicesWrapper}>
        <div className={servicesWrapper_title}>
          <h1>Servives we provide.</h1>
          <p>
            From web designing to developing, webdew is here for all kinds of
            website services you need.
          </p>
        </div>

        <FetchServices />
      </section>

      <ServiceIndustries />

      <GetStarted />
      <FaqsSection />
      <Prefooter />
    </div>
  );
}

export default Page;
