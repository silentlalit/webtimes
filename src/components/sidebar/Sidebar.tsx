"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./sidebar.module.scss";

const { sideMenuContainer, sideMenuContainerHover, sideMenu } = styles;

const Sidebar = ({ menu }: any) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`${sideMenuContainer} ${isHover && sideMenuContainerHover}`}>
      <ul
        className={sideMenu}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        {menu.map(({ name, Icon, link }: any, idx: number) => (
          <Link href={link} key={idx}>
            <li>
              {/* <Icon size={35} color={`${isHover ? "#fff" : "#6b7688"}`} /> */}
              {Icon}
              <span>{name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
