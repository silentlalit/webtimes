"use client";

import React from "react";
import Image from "next/image";
import styles from "@/styles/projectsPage.module.scss";
import {
  FaqsSection,
  OurTeamSection,
  Prefooter,
  Testimonials,
} from "@/container";
import ProjectsSection from "./ProjectsSection";

const {
  main,
  projectHeader,
  projectHeader_text,
  projectHeader_image,
  container,
} = styles;

const ProjectsPage = () => {
  return (
    <div className={main}>
      <div className={projectHeader}>
        <div className={`${container} dContainer`}>
          <div className={projectHeader_text}>
            <h4 className="topTag">CHECK OUR</h4>
            <h1>Our work for thriving start-ups and businesses</h1>
            <p>
              Our case studies are for you to see how we proceed to ensure
              successful results.
            </p>

            <p>review-star (4.9 out of 5 Ratings)</p>
          </div>

          <div className={projectHeader_image}>
            <Image
              src={"/projectHeader.svg"}
              alt={"projects header"}
              width={600}
              height={450}
            />
          </div>
        </div>
      </div>

      <ProjectsSection />

      <OurTeamSection />
      <Testimonials />
      <FaqsSection />
      <Prefooter />
    </div>
  );
};

export default ProjectsPage;
