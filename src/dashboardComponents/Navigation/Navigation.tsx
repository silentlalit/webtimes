import Link from "next/link";
import React from "react";

import styles from "./navigation.module.scss";

const { navigation } = styles;

function Navigation() {
  return (
    <div className={navigation}>
      <ul>
        <Link href="/cms/dashboard">
          <li>Dashboard</li>
        </Link>
        <Link href="/cms/services">
          <li>Services</li>
        </Link>
        <Link href="/cms/projects">
          <li>Projects</li>
        </Link>
        <Link href="/cms/skills">
          <li>Skills</li>
        </Link>
        <Link href="/cms/testimonials">
          <li>Reviews</li>
        </Link>
        <Link href="/cms/about">
          <li>About us</li>
        </Link>
        <Link href="/cms/contact">
          <li>Contact us</li>
        </Link>
        <Link href="/cms/cat-and-tech">
          <li>categories And Technologies</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navigation;
