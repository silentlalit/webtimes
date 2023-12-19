import React from "react";
import Image from "next/image";
import styles from "./getStarted.module.scss";
import Link from "next/link";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

const { getStarted, container, step, img, text } = styles;

type PropType = {
  id: string;
  title: string;
  label: string;
  icon: string;
  link: string;
};
const data = [
  {
    id: "STEP ONE",
    title: "STEP ONE",
    label: `Create an webtimes account.`,
    icon: "/step1.png",
    link: "/userAuth/signup",
  },
  {
    id: "STEP TWO",
    title: "STEP TWO",
    label:
      "Select and configure your services with assistance from an webtimes guardian.",
    icon: "/step2.png",
    link: "",
  },
  {
    id: "STEP THREE",
    title: "STEP THREE",
    label:
      "Immediately see detailed supply chain data to drive intelligence based decisions.",
    icon: "/step3.png",
    link: "",
  },
] as PropType[];

function GetStarted() {
  return (
    <section className={getStarted}>
      <h4 className="topTag center">Steps</h4>
      <h2>Easy to Get Started</h2>

      <div className={`${container} dContainer`}>
        {data.map(({ id, title, label, icon, link }: PropType) => (
          <div key={id} className={step}>
            <div className={img}>
              <Image src={icon} fill alt={title} />
            </div>

            <div className={text}>
              <h3>{title}</h3>
              <p>
                {label}
                <Link href={link} style={{ color: "var(--ternary-color)" }}>
                  <LiaExternalLinkAltSolid size={25} />
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GetStarted;
