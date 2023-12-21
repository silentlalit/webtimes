"use client";

import React, { useEffect } from "react";
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

// redux
import { useAppDispatch } from "@/redux/hook";
import { fetchServices } from "@/redux/slices/servicesSlice";
import { fetchProjects } from "@/redux/slices/projectsSlice";
import { fetchSkills } from "@/redux/slices/skillsSlice";
import { fetchTestimonials } from "@/redux/slices/testimonialsSlice";

const { homepage } = styles;

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchTestimonials());
  }, [dispatch]);

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
