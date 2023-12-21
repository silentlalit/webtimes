"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import styles from "@/styles/servicesPage.module.scss";
import { Tag } from "@/components";
import { Service } from "@/utils/interface";
import { trimContent } from "@/utils/utileFun";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchServices } from "@/redux/slices/servicesSlice";

const { container, servicesBox, servicesImage, technology } = styles;

const FetchServices = () => {
  const dispatch = useAppDispatch();
  const { services, loading } = useAppSelector((state) => state.service);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!services.length) dispatch(fetchServices());
  }, [dispatch, services.length]);

  function InlineWrapperWithMargin({ children }: PropsWithChildren) {
    return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
  }

  return (
    mounted && (
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
    )
  );
};

export default FetchServices;
