"use client";

import React, {useState, useEffect, Fragment} from "react";
import { GiSpaceSuit } from "react-icons/gi";
import { GoHome, GoProject } from "react-icons/go";
import { BsChatLeft } from "react-icons/bs";
import { MdOutlineContacts } from "react-icons/md";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

import styles from "@/styles/userLayout.module.scss";
import { LoadingUser, Sidebar } from "@/components";
import { SocketProvider } from "@/providers/socketIo";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store/store";

const { userLayout, container, userProfileMenu } = styles;

const menu = [
  {
    name: "My Space",
    Icon: <GiSpaceSuit size={35} />,
    link: "/user/profile",
  },
  {
    name: "Home",
    Icon: <GoHome size={35} />,
    link: "/user",
  },
  {
    name: "My Orders",
    Icon: <GoProject size={35} />,
    link: "/user/orders",
  },
  {
    name: "Chats",
    Icon: <BsChatLeft size={35} />,
    link: "/user/chats",
  },
  {
    name: "Contact Us",
    Icon: <MdOutlineContacts size={35} />,
    link: "/contact-us",
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector(
    (state: RootState) => state.authUser
  );
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => { setOpenMenu(false) }, [pathname]);

  const handleOpenMenu = () => setOpenMenu(!openMenu);

  return (
    <div className={userLayout}>
      {!isAuthenticated ? (
        <LoadingUser />
      ) : (
        <Fragment>
          <div className={`flex ${userProfileMenu}`} onClick={handleOpenMenu}>
            <RiBarChartHorizontalLine
              size={22}
              color="var(--black-color)"
            />
          </div>

          <Sidebar menu={menu} openMenu={openMenu} />

          <SocketProvider>
            <div className={`${container} dContainer`}>{children}</div>
          </SocketProvider>
        </Fragment>
      )}
    </div>
  );
};

export default Layout;
