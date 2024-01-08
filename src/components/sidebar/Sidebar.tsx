"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./sidebar.module.scss";
import { AiOutlineLogout } from "react-icons/ai";
import { useAppDispatch } from "@/redux/hook";
import { logout } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";

const { sideMenuContainer, sideMenuContainerHover, sideMenu, openMenuClass } = styles;

const Sidebar = ({ menu, openMenu }: any) => {
  const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState(false);

  const SignOut = async () => {
    try {
      await dispatch(logout());
      
      toast.success("Logged Out.")
    } catch (error:any) {
      toast.error(`Failed: ${error.message}`)
    }

  }

  return (
    <div
      className={`${sideMenuContainer} ${isHover && sideMenuContainerHover} ${openMenu && openMenuClass}`}>
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
        <li onClick={SignOut}>
          <AiOutlineLogout size={30} color="var(--red-color)" />
          <span style={{color: "var(--red-color)"}}>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
