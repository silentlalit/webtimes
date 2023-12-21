"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/projectsPage.module.scss";
import Skeleton from "react-loading-skeleton";
import { BsGithub } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { GiExpand } from "react-icons/gi";
import { Project } from "@/utils/interface";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchProjects } from "@/redux/slices/projectsSlice";
import { Modal, Tag } from "@/components";
import { RootState } from "@/redux/store/store";

const {
  container,
  projectsSection,
  projectsSection_title,
  projectsSection_wrapper,
  projectsSection_project,
  projectsSection_projectImage,
  projectsSection_image,
  projectsSection_projectView,
  expandProject,
  projectShowcase,
} = styles;

type FilterProps = {
  categories: { label: string; value: string }[];
  technologies: { label: string; value: string }[];
  pricing: { label: string; value: string }[];
  rating: number;
};

const ProjectsSection = () => {
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector(
    (state: RootState) => state.project
  );
  const [filters, setFilters] = useState<FilterProps>({
    categories: [{ label: "Websites", value: "Websites" }],
    technologies: [],
    pricing: [],
    rating: 0,
  });
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!projects.length) dispatch(fetchProjects());
  }, [dispatch, projects.length]);

  useEffect(() => {
    const filterProjectsFun = () => {
      // filter categories
      const found = filters.categories.length
        ? projects.filter((pr) =>
            pr.categories.some((prCat) => {
              return filters.categories.some(
                (cat) => prCat.value === cat.value
              );
            })
          )
        : projects;

      return found;
    };

    setFilteredProjects(filterProjectsFun());
  }, [filters, projects]);

  const clearFilters = () => {
    setFilters({
      categories: [{ label: "Websites", value: "Websites" }],
      technologies: [],
      pricing: [],
      rating: 0,
    });
  };

  return (
    <>
      <section className={projectsSection}>
        <div className={`${container} dContainer`}>
          <div className={projectsSection_title}>
            <h4 className="topTag center">PROJECTS</h4>
            <h2>Our projects showcase</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
              suscipit aspernatur tenetur, omnis fugit ratione qui voluptas est,
              accusamus sequi vero. Culpa itaque delectus voluptas eum soluta
              laudantium et? Unde?
            </p>
          </div>

          <div className={projectShowcase}>
            <Filters
              filters={filters}
              setFilters={setFilters}
              clearFilters={clearFilters}
            />

            <div className={projectsSection_wrapper}>
              {loading || !projects.length
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((skeleton) => (
                    <div key={skeleton} className={projectsSection_project}>
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
                  ))
                : filteredProjects?.map((pr: Project) => {
                    const { _id, title, categories, thumbnail, link, github } =
                      pr;
                    return (
                      <div key={_id} className={projectsSection_project}>
                        <div className={projectsSection_projectImage}>
                          <div
                            className={expandProject}
                            onClick={() => setOpenProject(pr)}>
                            <GiExpand size={30} />
                          </div>

                          <div>
                            <Image
                              className={projectsSection_image}
                              src={`/upload/projects/${thumbnail}`}
                              fill
                              sizes="100%"
                              alt={title}
                            />
                          </div>

                          <div className={projectsSection_projectView}>
                            <a
                              href={github ? github : "#"}
                              target="_blank"
                              rel="noopener noreferrer">
                              <BsGithub size={25} />
                            </a>

                            <a
                              href={link ? link : "#"}
                              target="_blank"
                              rel="noopener noreferrer">
                              <AiFillEye size={25} />
                            </a>
                          </div>
                        </div>

                        <h4 style={{ marginTop: 12 }}>{title}</h4>
                        <div
                          className="flex"
                          style={{
                            gap: 10,
                            justifyContent: "flex-start",
                            marginTop: 8,
                            flexWrap: "wrap",
                          }}>
                          {categories.map((cat, idx) => (
                            <Tag key={idx} text={cat.value} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
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

export default ProjectsSection;

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
