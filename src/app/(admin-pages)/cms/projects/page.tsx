"use client";

import React, { useEffect } from "react";
import { GrFormAdd } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ButtonTag, Loader } from "@/components";
import styles from "@/styles/cmsServicesPage.module.scss";

// redux
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchProjects, deleteProject } from "@/redux/slices/projectsSlice";
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
  const { projects, loading } = useAppSelector((state) => state.project);

  useEffect(() => {
    if (!projects.length) dispatch(fetchProjects());
  }, [dispatch, projects.length]);

  return (
    <div className={cms_servicesPage}>
      <h1>Projects</h1>

      <Link href="/cms/projects/_new">
        <ButtonTag icon={<GrFormAdd />} text="Add new Project" />
      </Link>

      <div className={servicesListing}>
        {loading ? (
          <Loader />
        ) : projects.length ? (
          projects.map(({ _id, title, description, thumbnail }: any) => (
            <div key={_id} className={serviceLisItem}>
              <div className={itemTitle}>
                <Image
                  src={`/upload/projects/${thumbnail}`}
                  width={50}
                  height={50}
                  alt={title}
                  object-fit="contain"
                />
                <div>
                  <h4>{title}</h4>
                  <p style={{ marginTop: 0 }}>
                    {trimContent(description, 55)}...
                  </p>
                </div>
              </div>

              <div className={itemEdit}>
                <span>
                  <Link href={`/cms/projects/${_id}`}>
                    <AiFillEdit />
                  </Link>
                </span>
                <span>
                  <AiFillDelete onClick={() => dispatch(deleteProject(_id))} />
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No projects listed.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
