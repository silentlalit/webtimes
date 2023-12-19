"use client";

import React, { useEffect } from "react";
import { GrFormAdd } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ButtonTag, Loader } from "@/components";
import styles from "@/styles/cmsServicesPage.module.scss";

// redux
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { fetchServices, deleteService } from "@/redux/slices/servicesSlice";
import { trimContent } from "@/utils/utileFun";

const {
  cms_servicesPage,
  servicesListing,
  serviceLisItem,
  itemTitle,
  itemEdit,
} = styles;

const Page = () => {
  const dispatch = useAppDispatch();
  const { services, loading } = useAppSelector((state: any) => state.service);

  useEffect(() => {
    if (!services.length) dispatch(fetchServices());
  }, [dispatch, services.length]);

  return (
    <div className={cms_servicesPage}>
      <h2>Services</h2>

      <Link
        href="/cms/services/_new"
        style={{ display: "block", width: " max-content" }}>
        <ButtonTag icon={<GrFormAdd />} text="Add new Service" />
      </Link>

      <div className={servicesListing}>
        {loading ? (
          <Loader />
        ) : (
          services?.map(({ _id, name, description, thumbnail }: any) => (
            <div key={_id} className={serviceLisItem}>
              <div className={itemTitle}>
                <Image
                  src={`/upload/services/${thumbnail}`}
                  width={50}
                  height={50}
                  alt={name}
                  object-fit="contain"
                />

                <div>
                  <h4>{name}</h4>
                  <p style={{ marginTop: 0 }}>
                    {trimContent(description, 55)}...
                  </p>
                </div>
              </div>

              <div className={itemEdit}>
                <span>
                  <Link href={`/cms/services/${_id}`}>
                    <AiFillEdit />
                  </Link>
                </span>

                <span>
                  <AiFillDelete onClick={() => dispatch(deleteService(_id))} />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
