"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import {
  Button,
  TextInput,
  SingleFileSelect,
  SelectMultipleTags,
  TextareaInput,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ProjectSchema } from "@/utils/schema";
import { createProject, updateProject } from "@/redux/slices/projectsSlice";
import { Project } from "@/utils/interface";

const defaultValues = {
  title: "",
  description: "",
  technologies: [],
  categories: [],
  thumbnail: "",
  github: "",
  link: "",
};

// type ProjectType = {
//   title: string;
//   description: string;
//   technologies: {
//     value?: string | undefined;
//     label?: string | undefined;
//   }[];
//   categories: {
//     value?: string | undefined;
//     label?: string | undefined;
//   }[];
//   thumbnail: string;
//   github?: string | undefined;
//   link?: string | undefined;
// };

const Form = ({ push, projectId, project }: any) => {
  const { technologiesList, categoriesList } = useAppSelector(
    (state) => state.staticData
  );
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(ProjectSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset({
      title: project?.title,
      description: project?.description,
      technologies: project?.technologies,
      categories: project?.categories,
      thumbnail: project?.thumbnail,
      github: project?.github,
      link: project?.link,
    });
  }, [project, reset]);

  const { technologies, categories, thumbnail }: any = project || "";

  const saveChanges = async (data: Project) => {
    setLoading(true);
    const fd = new FormData();
    const {
      title,
      description,
      technologies,
      categories,
      thumbnail,
      github = "",
      link = "",
    } = data;

    fd.append("title", title);
    fd.append("description", description);
    fd.append("github", github);
    fd.append("link", link);
    fd.append("technologies", JSON.stringify(technologies));
    fd.append("categories", JSON.stringify(categories));
    fd.append("thumbnail", thumbnail);

    if (projectId === "_new") {
      const { payload }: any = await dispatch(createProject(fd));
      if (payload.success) {
        push(`/cms/projects?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`);
        toast.success(payload.message);
        setLoading(false);
      } else {
        toast.success(payload.error);
        setLoading(false);
      }
    } else {
      fd.append("id", projectId);
      const { payload }: any = await dispatch(updateProject(fd));
      if (payload.success) {
        toast.success(payload.message);
        setLoading(false);
      } else {
        toast.success(payload.error);
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(saveChanges)}>
      <TextInput
        placeholder="Project name"
        label="Project name"
        control={control}
        name="title"
        error={errors.title}
      />

      <TextareaInput
        placeholder="Project description"
        label="Project description"
        control={control}
        name="description"
        error={errors.description}
      />

      <SelectMultipleTags
        placeholder="Select related categories"
        label="Select related categories"
        control={control}
        name="categories"
        error={errors.categories}
        isMulti={true}
        isSearchable={true}
        selected={categories}
        options={categoriesList}
      />

      <SelectMultipleTags
        placeholder="Select related technologies"
        label="Select related technologies"
        control={control}
        name="technologies"
        error={errors.technologies}
        isMulti={true}
        isSearchable={true}
        selected={technologies}
        options={technologiesList}
      />

      <TextInput
        placeholder="Github link"
        label="Github link"
        control={control}
        name="github"
        error={errors.github}
      />

      <TextInput
        placeholder="Project link"
        label="Project link"
        control={control}
        name="link"
        error={errors.link}
      />

      <SingleFileSelect
        placeholder="Select a Project thumbnail:"
        label="Select a Project thumbnail:"
        control={control}
        name="thumbnail"
        error={errors.thumbnail}
        file={thumbnail}
        url="/upload/projects/"
      />

      <Button
        type="submit"
        title="Save Project"
        wrapperStyle={{
          marginTop: 40,
          pointerEvents: loading ? "none" : "all",
        }}
        loading={loading}
        disabled={loading}
      />
    </form>
  );
};

export default Form;
