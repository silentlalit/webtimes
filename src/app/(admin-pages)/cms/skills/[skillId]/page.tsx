"use client";

import React, { useEffect } from "react";
import { Loader } from "@/components";

// redux
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { clearSkill, getSkill } from "@/redux/slices/skillsSlice";
import Form from "./Form";

function Page({ params }: any) {
  const { skillId } = params;
  const dispatch = useAppDispatch();
  const { skill, loading } = useAppSelector((state) => state.skill);

  useEffect(() => {
    if (skillId !== "_new") dispatch(getSkill(skillId));

    return () => {
      dispatch(clearSkill());
    };
  }, [skillId, dispatch]);

  return (
    <div className="cms_editService">
      <h2>{skillId !== "_new" ? "Update Skill" : "Create Skill"}</h2>
      <hr />

      {loading && skillId !== "_new" ? (
        <Loader />
      ) : (
        <Form skill={skill} skillId={skillId} />
      )}
    </div>
  );
}

export default Page;
