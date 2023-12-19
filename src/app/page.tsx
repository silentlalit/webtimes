import React from "react";
import {
  CommonSec,
  FaqsSection,
  Hero,
  Prefooter,
  Projects,
  ServiceIndustries,
  Services,
  Skills,
  Testimonials,
  TopClients,
} from "@/container";
import styles from "@/styles/Home.module.scss";

const { homepage } = styles;

const HomePage = () => {
  return (
    <div className={homepage}>
      <Hero />

      <TopClients />

      <ServiceIndustries />

      <CommonSec
        tag="IT'S TIME TO"
        title="Grow your business <br /> with webtimes!"
        content="Whether you are looking for end-to-end website design or looking to optimize your website with some powerful integrations, webdew is here to make it happen. Additional features and integrations will turn your website into a multi-faceted, highly-functioning machine. All you have to do is tell us what you need."
        image="/grow_with_webtimes.svg"
        buttonTitle="Contact us"
        link="/contact-us"
      />

      <Services />
      <Projects />
      <Skills />
      <Testimonials />
      <FaqsSection />
      <Prefooter />
    </div>
  );
};

export default HomePage;
