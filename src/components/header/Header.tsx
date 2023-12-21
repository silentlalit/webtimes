"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components";
import { useAppSelector } from "@/redux/hook";
import styles from "./header.module.scss";
import Profile from "./Profile";
import { usePathname } from "next/navigation";
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";

const {
  header_wrapper,
  desktop_header,
  mob_header,
  header,
  container,
  logo,
  menu,
  hembugger_menu,
  hembugger_menu_title,
  profileIcon,
  activeLink,
} = styles;

const mainMenu = [
  { name: "Home", link: "/" },
  { name: "Who We Are", link: "/about-us" },
  { name: "Projects", link: "/projects" },
  { name: "Services", link: "/services" },
  // { name: "Pricing", link: "/pricing" },
];

const Header = () => {
  const { isAuthenticated, logggedInUser, loading }: any = useAppSelector(
    (state) => state.authUser
  );
  const [openProfile, setOpenProfile] = useState(false);
  const pathname = usePathname();
  const [openMobMenu, setOpenMobMenu] = useState(false);

  console.log("header");

  useEffect(() => {
    setOpenMobMenu(false);
  }, [pathname]);

  return (
    <>
      <header className={`${header_wrapper} ${desktop_header}`}>
        <div className={header}>
          <div className={`dContainer ${container}`}>
            <div className={logo}>
              <Link href="/">
                <div>
                  <Image
                    src={"/logo1.svg"}
                    width={60}
                    height={50}
                    priority={true}
                    alt="logo"
                  />
                  <h1>WebTimes</h1>
                </div>
              </Link>
            </div>

            <ul className={menu}>
              {mainMenu.map(({ name, link }, idx) => (
                <li key={idx} className={`${pathname === link && activeLink}`}>
                  <Link href={link}>{name}</Link>
                </li>
              ))}
            </ul>

            <ul className={menu}>
              {isAuthenticated ? (
                <li
                  className={profileIcon}
                  onClick={() => setOpenProfile(!openProfile)}>
                  <Image
                    src={logggedInUser.avatar}
                    width={40}
                    height={40}
                    alt={logggedInUser.username}
                  />
                  <span>{logggedInUser.username}</span>
                </li>
              ) : (
                <li>
                  <Link href={"/userAuth/login"}>Login/SignIn</Link>
                </li>
              )}

              <li>
                <Link href="/contact-us">
                  <Button title="Contact Us" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {openProfile ? (
          <Profile
            user={logggedInUser}
            setOpenProfile={setOpenProfile}
            loading={loading}
          />
        ) : null}
      </header>

      <header className={`${header_wrapper} ${mob_header}`}>
        <div className={header}>
          <div className={`dContainer ${container}`}>
            <div className={logo}>
              <Link href="/">
                <div>
                  <Image
                    src={"/logo1.svg"}
                    width={60}
                    height={50}
                    priority={true}
                    alt="logo"
                  />
                  <h1>WebTimes</h1>
                </div>
              </Link>
            </div>

            <RiMenu3Line
              size={30}
              color="var(--black-color)"
              style={{ cursor: "pointer" }}
              onClick={() => setOpenMobMenu(true)}
            />
          </div>

          <div
            className={hembugger_menu}
            style={openMobMenu ? { transform: "translate(0)" } : {}}>
            <div className={hembugger_menu_title}>
              <div className={logo}>
                <Link href="/">
                  <div>
                    <Image
                      src={"/logo1.svg"}
                      width={60}
                      height={50}
                      priority={true}
                      alt="logo"
                    />
                    <h1>WebTimes</h1>
                  </div>
                </Link>
              </div>

              <RiCloseFill
                size={30}
                color="var(--secondary-color)"
                style={{ cursor: "pointer" }}
                onClick={() => setOpenMobMenu(false)}
              />
            </div>

            <div
              className="flex h-full flex-col"
              style={{
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}>
              <ul className={menu} style={{ margin: "20px 0" }}>
                {mainMenu.map(({ name, link }, idx) => (
                  <li
                    key={idx}
                    className={`${pathname === link && activeLink}`}>
                    <Link href={link}>{name}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact-us">
                    <Button title="Contact Us" />
                  </Link>
                </li>
              </ul>

              <ul
                className={menu}
                style={{
                  backgroundColor: "var(--white-color)",
                  position: "sticky",
                  bottom: 0,
                  paddingBottom: 20,
                }}>
                {isAuthenticated ? (
                  <li
                    style={{ borderTop: "1px solid var(--lightGray-color)" }}
                    className={profileIcon}
                    onClick={() => setOpenProfile(!openProfile)}>
                    <Image
                      src={logggedInUser.avatar}
                      width={40}
                      height={40}
                      alt={logggedInUser.username}
                    />
                    <span>{logggedInUser.username}</span>
                  </li>
                ) : (
                  <li>
                    <Link href={"/userAuth/login"}>
                      Login {"  "} | {"  "} SignIn
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {openProfile ? (
          <Profile
            user={logggedInUser}
            setOpenProfile={setOpenProfile}
            loading={loading}
          />
        ) : null}
      </header>
    </>
  );
};

export default Header;
