"use client";

import React from "react";
import { GoHome, GoProject } from "react-icons/go";
import { MdOutlineCategory, MdOutlineContactPage } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { SiAboutdotme, SiSkillshare } from "react-icons/si";
import { LoadingUser, Sidebar } from "@/components";

import styles from "@/styles/cmsLayout.module.scss";
import { GiSkills } from "react-icons/gi";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store/store";
const { cmsDashboard, container, dashboard } = styles;

const menu = [
  {
    name: "Dashboard",
    Icon: <GoHome size={28} />,
    link: `/cms/dashboard?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`,
  },
  {
    name: "Projects",
    Icon: <GoProject size={28} />,
    link: `/cms/projects?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`,
  },
  {
    name: "Services",
    Icon: <GrServices size={28} />,
    link: `/cms/services?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`,
  },
  {
    name: "Skills",
    Icon: <SiSkillshare size={28} />,
    link: `/cms/skills?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`,
  },
  {
    name: "Testimonial",
    Icon: <GiSkills size={28} />,
    link: `/cms/testimonials?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`,
  },
  {
    name: "Categories And Technologies",
    Icon: <MdOutlineCategory size={28} />,
    link: `/cms/cat-and-tech?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`,
  },
  {
    name: "About us Page",
    Icon: <SiAboutdotme size={28} />,
    link: `/cms/about?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`,
  },
  {
    name: "Contact us Page",
    Icon: <MdOutlineContactPage size={28} />,
    link: `/cms/contact?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`,
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector(
    (state: RootState) => state.authUser
  );

  return (
    <div className={cmsDashboard}>
      {!isAuthenticated ? (
        <LoadingUser />
      ) : (
        <>
          <Sidebar menu={menu} />

          <div className={`${container} dContainer`}>
            <div className={dashboard}>{children}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
