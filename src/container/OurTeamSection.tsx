import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GiDiamondTrophy } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import styles from "@/styles/projectsPage.module.scss";

const { container, team, team_img, team_text, team_value, value } = styles;

function OurTeam() {
  return (
    <section className={team}>
      <div className={`${container} dContainer`}>
        <div className={team_img}>
          <Image src="/arjun.png" alt="Arjun" width={300} height={400} />
        </div>

        <div className={team_text}>
          <h4 className="topTag">Webtimes</h4>
          <h2>Our Team is your Team</h2>
          <p>
            Our team of talented professionals specialized in websites, web apps
            and mobile app development works tirelessly to help your business
            grow. All we await is an opportunity to help. Thank you for all the
            support and love. We hope to serve you soon. Learn more about{" "}
            <Link href="/about" style={{ color: "rgb(92, 159, 247)" }}>
              webtimes
            </Link>
          </p>

          <div className={team_value}>
            <div className={value}>
              <GiDiamondTrophy size={55} color="rgb(92, 159, 247)" />
              <p>
                <span>5+</span> <br /> years of experience
              </p>
            </div>
            <div className={value}>
              <AiOutlineFundProjectionScreen
                size={55}
                color="rgb(92, 159, 247)"
              />
              <p>
                <span>50+</span> <br /> Project completed
              </p>
            </div>
            <div className={value}>
              <HiUserGroup size={55} color="rgb(92, 159, 247)" />
              <p>
                <span>50+</span> <br /> clients globally
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurTeam;
