"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  TextInput,
  SingleFileSelect,
  SelectMultipleTags,
  TextareaInput,
  CheckboxInput,
  DateInput,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { SkillSchema } from "@/utils/schema";
import toast from "react-hot-toast";
import { createSkill, updateSkill } from "@/redux/slices/skillsSlice";

const defaultValues = {
  position: "",
  company: "",
  companyLink: "",
  technologies: [],
  startDate: null,
  endDate: null,
  workingNow: false,
  description: "",
  image: "",
};

const Form = ({ skill, skillId }: any) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { technologiesList } = useAppSelector((state) => state.staticData);
  const [showEndDate, setShowEndDate] = useState<boolean>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(SkillSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (skill) {
      reset(skill);
      setShowEndDate(() => skill.workingNow);
    }
  }, [skill, reset]);

  const { technologies, image } = skill || "";

  const saveChanges = async (data: any) => {
    setLoading(true);
    const fd = new FormData();
    const {
      position,
      company,
      companyLink,
      technologies,
      startDate,
      workingNow,
      description,
      image,
      endDate,
    } = data;

    fd.append("position", position);
    fd.append("company", company);
    fd.append("companyLink", companyLink);
    fd.append("technologies", JSON.stringify(technologies));
    fd.append("startDate", startDate);
    fd.append("endDate", showEndDate ? "" : endDate);
    fd.append("workingNow", workingNow);
    fd.append("description", description);
    fd.append("image", image);

    if (skillId === "new") {
      const { payload }: any = await dispatch(createSkill(fd));

      if (payload.success) {
        toast.success(payload.message);
        push("/cms/skills");
        setLoading(false);
      } else {
        toast.error(payload.error);
        setLoading(false);
      }
    } else {
      fd.append("id", skillId);
      const { payload }: any = await dispatch(updateSkill(fd));
      if (payload.success) {
        toast.success(payload.message);
        push("/cms/skills");
        setLoading(false);
      } else {
        toast.error(payload.error);
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(saveChanges)}>
      <TextInput
        placeholder="Job Position"
        label="Job Position"
        control={control}
        name="position"
        error={errors.position}
      />

      <TextInput
        placeholder="Company"
        label="Company Name"
        control={control}
        name="company"
        error={errors.company}
      />

      <TextInput
        placeholder="Company Link"
        label="Company Link"
        control={control}
        name="companyLink"
        error={errors.companyLink}
        type="url"
      />

      <TextareaInput
        placeholder="Job Description"
        label="Job Description"
        control={control}
        name="description"
        error={errors.description}
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

      <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
        <DateInput
          placeholder="Start job Date"
          label="Start job Date"
          control={control}
          name="startDate"
          error={errors.startDate}
        />

        {!showEndDate && (
          <DateInput
            placeholder="End job Date"
            label="End job Date"
            control={control}
            name="endDate"
            error={errors.endDate}
          />
        )}
      </div>

      <CheckboxInput
        placeholder="working Now"
        label="working Now"
        control={control}
        name="workingNow"
        error={errors.workingNow}
        setShow={setShowEndDate}
      />

      <SingleFileSelect
        label="Select a Skill image:"
        control={control}
        name="image"
        error={errors.image}
        file={image}
        url="/upload/"
      />

      <Button
        type="submit"
        title="Save Service"
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
