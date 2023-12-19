"use client";

import React, { PropsWithChildren, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import styles from "@/styles/servicesPage.module.scss";
import { Tag } from "@/components";
import { Service } from "@/utils/interface";

// redux
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchServices } from "@/redux/slices/servicesSlice";
import {
  FaqsSection,
  GetStarted,
  Prefooter,
  ServiceIndustries,
} from "@/container";
import { trimContent } from "@/utils/utileFun";

const {
  main,
  container,
  serviceHeader,
  serviceHeader_text,
  serviceHeader_video,
  servicesWrapper,
  servicesWrapper_title,
  servicesBox,
  servicesImage,
  technology,
} = styles;

function Page() {
  const dispatch = useAppDispatch();
  const { services, loading } = useAppSelector((state) => state.service);

  useEffect(() => {
    if (!services.length) dispatch(fetchServices());
  }, [dispatch, services.length]);

  function InlineWrapperWithMargin({ children }: PropsWithChildren) {
    return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
  }

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
              onLoadStart={(e: any) => (e.playbackRate = 2)}
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

        <div className={`${container} dContainer`}>
          {loading
            ? [1, 2, 3, 4].map((skeleton) => (
                <div key={skeleton} className={servicesBox}>
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
                  <Skeleton
                    count={5}
                    wrapper={InlineWrapperWithMargin}
                    inline
                    width={60}
                  />
                </div>
              ))
            : services?.map(
                ({
                  _id,
                  name,
                  description,
                  thumbnail,
                  technologies,
                }: Service) => (
                  <div key={_id} className={servicesBox}>
                    <Image
                      src={`/upload/services/${thumbnail}`}
                      width={200}
                      height={100}
                      alt={`${name}`}
                      className={servicesImage}
                    />
                    <Link href={`/services/${_id}`}>
                      <h3>{name}</h3>
                    </Link>
                    <p>
                      <span>{trimContent(description, 180)}.... </span>
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
                )
              )}
        </div>
      </section>

      <ServiceIndustries />

      <GetStarted />
      <FaqsSection />
      <Prefooter />
    </div>
  );
}

export default Page;
