"use client";

import React, { PropsWithChildren } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import Image from "next/image";
import { Tag } from "../../components";
import { Skill } from "../../utils/interface";
import styles from "./Skills.module.scss";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { useAppSelector } from "@/redux/hook";

const { skills_sections, container, expWrapper } = styles;

function InlineWrapperWithMargin({ children }: PropsWithChildren) {
  return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
}

const Skills = () => {
  const { skills, loading } = useAppSelector((state: any) => state.skill);

  const timeInterval = (
    startDate: string,
    endDate: string,
    workingNow: boolean
  ) =>
    `${moment(startDate).format("MM/YYYY")} - ${
      !workingNow ? moment(endDate).format("MM/YYYY") : "present"
    }`;

  return (
    <section className={skills_sections}>
      <div className={`${container} dContainer`}>
        <h2>Skills & Experience</h2>

        <div className={expWrapper}>
          <VerticalTimeline>
            {loading ? (
              <SkeletonLoading />
            ) : (
              skills?.map(
                ({
                  _id,
                  startDate,
                  endDate,
                  workingNow,
                  image,
                  position,
                  company,
                  description,
                  technologies,
                }: Skill) => (
                  <VerticalTimelineElement
                    key={_id}
                    className="vertical-timeline-element--work"
                    contentStyle={{
                      border: "0.1px solid #aeb5ff",
                      boxShadow: "0px 0px 3px rgb(0 0 0 / 20%)",
                      borderRadius: 15,
                      backgroundColor: "var(--white-color)",
                    }}
                    contentArrowStyle={{
                      borderRight: "12px solid  rgb(33, 150, 243)",
                    }}
                    date={timeInterval(startDate, endDate, workingNow)}
                    iconStyle={{
                      width: 50,
                      height: 50,
                      boxShadow: "unset",
                      backgroundColor: "#fff",
                    }}
                    icon={
                      <Image
                        src={`/upload/${image}`}
                        alt={`${position}`}
                        width={50}
                        height={50}
                      />
                    }
                    data-aos="zoom-in"
                    >
                    <h3>{position}</h3>
                    <h4>Company: {company}</h4>
                    <p dangerouslySetInnerHTML={{ __html: description }} />

                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        marginTop: 10,
                        flexWrap: "wrap",
                      }}>
                      {technologies.map(({ label, value }) => (
                        <Tag key={label} text={value} />
                      ))}
                    </div>
                  </VerticalTimelineElement>
                )
              )
            )}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

const SkeletonLoading = () => {
  return (
    <>
      {[1, 2].map((skeleton) => (
        <VerticalTimelineElement
          key={skeleton}
          className="vertical-timeline-element--work"
          contentStyle={{
            border: "0.1px solid #aeb5ff",
            boxShadow: "0px 0px 3px rgb(0 0 0 / 20%)",
            borderRadius: 15,
          }}
          contentArrowStyle={{
            borderRight: "12px solid  rgb(33, 150, 243)",
          }}
          iconStyle={{
            width: 50,
            height: 50,
            boxShadow: "unset",
            backgroundColor: "#fff",
          }}
          icon={
            <Skeleton
              circle
              width={50}
              height={50}
              containerClassName="avatar-skeleton"
            />
          }>
          <h3>
            <Skeleton />
          </h3>
          <h4>
            <Skeleton />
          </h4>
          <p>
            <Skeleton count={4} />
          </p>

          <Skeleton
            count={5}
            wrapper={InlineWrapperWithMargin}
            inline
            width={60}
          />
        </VerticalTimelineElement>
      ))}
    </>
  );
};

export default Skills;
