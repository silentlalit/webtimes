import React from "react";
import { GoHome, GoProject } from "react-icons/go";
import { MdOutlineCategory, MdOutlineContactPage } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { SiAboutdotme, SiSkillshare } from "react-icons/si";
import { Sidebar } from "@/components";

import styles from "@/styles/cmsLayout.module.scss";
import { GiSkills } from "react-icons/gi";
const { cmsDashboard, container, dashboard } = styles;

const menu = [
  {
    name: "Dashboard",
    Icon: <GoHome size={28} />,
    link: "/cms/dashboard",
  },
  {
    name: "Projects",
    Icon: <GoProject size={28} />,
    link: "/cms/projects",
  },
  {
    name: "Services",
    Icon: <GrServices size={28} />,
    link: "/cms/services",
  },
  {
    name: "Skills",
    Icon: <SiSkillshare size={28} />,
    link: "/cms/skills",
  },
  {
    name: "Testimonial",
    Icon: <GiSkills size={28} />,
    link: "/cms/testimonials",
  },
  {
    name: "Categories And Technologies",
    Icon: <MdOutlineCategory size={28} />,
    link: "/cms/cat-and-tech",
  },
  {
    name: "About us Page",
    Icon: <SiAboutdotme size={28} />,
    link: "/cms/about",
  },
  {
    name: "Contact us Page",
    Icon: <MdOutlineContactPage size={28} />,
    link: "/cms/contact",
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cmsDashboard}>
      <Sidebar menu={menu} />

      <div className={`${container} dContainer`}>
        <div className={dashboard}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
