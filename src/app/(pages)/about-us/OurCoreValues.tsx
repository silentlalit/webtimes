"use client";

import Image from "next/image";

import styles from "@/styles/aboutUsPage.module.scss";

const {
  ourCoreValues,
  container,
  ourCoreValues_title,
  underline,
  dot,
  ourCoreValues_Slider,
  ourCoreValues_Slide,
} = styles;

const coreValues = [
  {
    id: "1",
    title: "Make the future",
    content:
      "When imagination is combined with heavily-concentrated effort, <br /> remarkable things happen.",
  },
  {
    id: "2",
    title: "Respect your Team",
    content:
      "From customers to colleagues, want the best for each other while expecting the very best from each other.",
  },
  {
    id: "3",
    title: "See the glass half full",
    content:
      "When obstacles come our way, work hard to understand the situation, then choose to focus on solutions, rather than sitting on problems.",
  },
  {
    id: "4",
    title: "Refine your craft",
    content:
      "Whether it’s through code, words, graphics or leadership — strive for excellence, even in the smallest of details.",
  },
  {
    id: "5",
    title: "Focus on results",
    content:
      "Productivity isn’t enough — it is about delivering the results to consistently move the needle forward.",
  },
] as {
  id: string;
  title: string;
  content: string;
}[];

function OurCoreValues() {
  return (
    <section className={ourCoreValues}>
      <div className={`${container} dContainer`}>
        <div className={ourCoreValues_title}>
          <h2>Our Core Values</h2>
          <Image
            className={underline}
            src={"/underline.png"}
            alt="underline"
            width={150}
            height={20}
          />
          <Image
            className={dot}
            src={"/dot.png"}
            alt="dot"
            width={15}
            height={15}
          />
        </div>

        <div className={ourCoreValues_Slider}>
          {coreValues.map(({ id, title, content }) => (
            <div className={ourCoreValues_Slide} key={id}>
              <h2>
                <span>{id}</span>
              </h2>

              <div>
                <h3 dangerouslySetInnerHTML={{ __html: title }} />
                <p dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurCoreValues;
