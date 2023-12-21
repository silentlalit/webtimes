"use client";

import React, { Fragment, useEffect } from "react";

import { loadUser } from "@/redux/slices/authSlice";
import { fetchServices } from "@/redux/slices/servicesSlice";
import { fetchProjects } from "@/redux/slices/projectsSlice";
import { fetchSkills } from "@/redux/slices/skillsSlice";
import { fetchTestimonials } from "@/redux/slices/testimonialsSlice";
import { useAppDispatch } from "@/redux/hook";

const App = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchServices());
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchTestimonials());
  }, [dispatch]);

  return <Fragment>{children}</Fragment>;
};

export default App;
