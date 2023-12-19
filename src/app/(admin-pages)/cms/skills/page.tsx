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
import { fetchSkills, deleteSkill } from "@/redux/slices/skillsSlice";
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
  const { skills, loading } = useAppSelector((state) => state.skill);

  useEffect(() => {
    if (!skills.length) dispatch(fetchSkills());
  }, [skills.length, dispatch]);

  return (
    <div className={cms_servicesPage}>
      <h1>Skills</h1>

      <Link href="/cms/skills/new">
        <ButtonTag icon={<GrFormAdd />} text="Add new Skill" />
      </Link>

      <div className={servicesListing}>
        {loading ? (
          <Loader />
        ) : (
          skills?.map(({ _id, company, position, description, image }: any) => (
            <div key={_id} className={serviceLisItem}>
              <div className={itemTitle}>
                <Image
                  src={`/upload/${image}`}
                  width={50}
                  height={50}
                  alt={company}
                  object-fit="contain"
                />
                <div>
                  <h4>{company}</h4>
                  <h4>{position}</h4>
                  <p style={{ marginTop: 0 }}>
                    {trimContent(description, 55)}...
                  </p>
                </div>
              </div>

              <div className={itemEdit}>
                <span>
                  <Link href={`/cms/skills/${_id}`}>
                    <AiFillEdit />
                  </Link>
                </span>
                <span>
                  <AiFillDelete onClick={() => dispatch(deleteSkill(_id))} />
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
