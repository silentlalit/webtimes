"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchProjects } from "@/redux/slices/projectsSlice";

export const fetchProjectsData = async () => {
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector((state) => state.project);
  await dispatch(fetchProjects());

  return { projects, loading };
};
