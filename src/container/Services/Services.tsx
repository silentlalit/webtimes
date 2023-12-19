import React, { PropsWithChildren } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { Button, Tag } from "../../components";
import { Service } from "../../utils/interface";

import styles from "./Services.module.scss";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import { trimContent } from "@/utils/utileFun";

const {
  skills_sections,
  container,
  wrapper,
  skillsBox,
  skillsImage,
  technology,
} = styles;

function InlineWrapperWithMargin({ children }: PropsWithChildren) {
  return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
}

function Services() {
  const { services, loading } = useAppSelector((state: any) => state.service);

  return (
    <section className={skills_sections}>
      <div className={`${container} dContainer`}>
        <h4 className="topTag center">Services</h4>
        <h2>Services We Provide</h2>

        <div className={wrapper}>
          {loading ? (
            <SkeletonLoading />
          ) : (
            services?.map((service: Service) => (
              <Service key={service._id} service={service} />
            ))
          )}
        </div>

        <Link href={"/contact-us"}>
          <Button
            title="Request a Free Consultation"
            wrapperStyle={{ marginTop: 70 }}
          />
        </Link>
      </div>
    </section>
  );
}

const SkeletonLoading = () => {
  return (
    <>
      {[1, 2, 3, 4].map((skeleton) => (
        <div key={skeleton} className={skillsBox}>
          <Skeleton
            width={200}
            height={100}
            containerClassName="avatar-skeleton"
          />
          <h2 style={{ width: "100%" }}>
            <Skeleton highlightColor="#fff" />
          </h2>
          <p style={{ width: "100%" }}>
            <Skeleton highlightColor="#fff" count={3} />
          </p>
          <div>
            <Skeleton
              count={5}
              wrapper={InlineWrapperWithMargin}
              inline
              width={60}
            />
          </div>
        </div>
      ))}
    </>
  );
};

const Service = ({ service }: { service: Service }) => {
  const { _id, name, description, thumbnail, technologies } = service;

  return (
    <div className={skillsBox}>
      <Image
        src={`/upload/services/${thumbnail}`}
        alt={`${name}`}
        width={200}
        height={100}
        className={skillsImage}
      />

      <Link href={`/services/${_id}`}>
        <h3>{name}</h3>
      </Link>
      <p>
        <span>{trimContent(description, 200)}.... </span>
        <Link href={`/services/${_id}`} className="link">
          See More
        </Link>
      </p>

      <div className={technology}>
        {technologies?.map(({ label, value }) => (
          <Tag key={label} text={value} />
        ))}
      </div>
    </div>
  );
};

export default Services;
