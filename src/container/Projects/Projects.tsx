"use client";

import Image from "next/image";

import { useState } from "react";
import styles from "./Projects.module.scss";
import { Button, Modal, Tag } from "@/components";
import { Project } from "@/utils/interface";
import { BsGithub } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { useAppSelector } from "@/redux/hook";
import { GiExpand } from "react-icons/gi";
import Link from "next/link";

const {
  work_section,
  container,
  work_container,
  workBox,
  project_image,
  image,
  project_view,
  expandProject,
} = styles;

const Projects = () => {
  const { projects, loading } = useAppSelector((state: any) => state.project);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <>
      <section className={work_section}>
        <div className={`${container} dContainer`}>
          <h5 className="topTag text-center">SHOWCASE</h5>
          <h2>My Work Projects</h2>

          <div className={work_container}>
            {loading ? (
              <SkeletonLoading />
            ) : (
              projects
                ?.filter((_: any, idx: number) => idx < 8)
                .map((pr: Project) => {
                  const { _id, title, categories, thumbnail } = pr;

                  return (
                    <div key={_id} className={workBox} data-aos="fade-up">
                      <div className={project_image}>
                        <div
                          className={expandProject}
                          onClick={() => setOpenProject(pr)}>
                          <GiExpand size={30} />
                        </div>

                        <div className={image}>
                          <Image
                            src={`/upload/projects/${thumbnail}`}
                            fill
                            sizes="100%"
                            alt={title}
                            style={{
                              objectFit: "cover",
                              objectPosition: "top",
                            }}
                          />
                        </div>

                        <div className={project_view}>
                          <BsGithub size={25} />
                          <AiFillEye size={25} />
                        </div>
                      </div>

                      <h4 style={{ marginTop: 10 }}>{title}</h4>
                      <div
                        className="flex"
                        style={{
                          gap: 10,
                          justifyContent: "flex-start",
                          marginTop: 10,
                          flexWrap: "wrap",
                        }}>
                        {categories.map((cat, idx) => (
                          <Tag key={idx} text={cat.value} />
                        ))}
                      </div>
                    </div>
                  );
                })
            )}
          </div>

          <Link href="/projects" style={{marginTop: "50px"}}>
              <Button
                title="View All Projects"
                wrapperStyle={{ display: "inline-block" }}
              />
          </Link>
        </div>
      </section>

      {openProject && (
        <Modal
          title={openProject.title}
          isOpen={openProject ? true : false}
          onClose={() => setOpenProject(null)}>
          <OpenProjectDetails {...openProject} />
        </Modal>
      )}
    </>
  );
};

const SkeletonLoading = () => {
  return (
    <>
      {[1, 2, 3].map((skeleton) => (
        <div key={skeleton} className={workBox}>
          <Skeleton
            width={290}
            height={450}
            containerClassName="avatar-skeleton"
            baseColor="#fff"
          />

          <p>
            <Skeleton baseColor="#fff" />
          </p>
          <h3>
            <Skeleton baseColor="#fff" />
          </h3>
        </div>
      ))}
    </>
  );
};

export default Projects;

const OpenProjectDetails = ({
  title,
  categories,
  thumbnail,
  link,
  description,
}: Project) => {
  return (
    <div style={{ marginTop: 20 }}>
      <h4>Description</h4>
      <p>{description}</p>
      <p>
        <strong>Website: </strong>{" "}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--blue-color", textDecoration: "underline" }}>
          {link}
        </a>
      </p>
      <div
        className="flex"
        style={{
          gap: 10,
          justifyContent: "flex-start",
          margin: "20px 0",
          flexWrap: "wrap",
        }}>
        <h4>Categories: </h4>
        {categories.map((cat, idx) => (
          <Tag key={idx} text={cat.value} />
        ))}
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 500,
          border: "1px solid var(--gray-color)",
          overflowY: "scroll",
        }}>
        <Image
          src={`/upload/projects/${thumbnail}`}
          alt={title}
          width={700}
          height={500}
          style={{
            objectFit: "cover",
            objectPosition: "top",
            width: "100%",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
};
