"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Faq } from "../../utils/interface";
import style from "./Faqs.module.scss";

const {
  faqs,
  container,
  faqContainer,
  faq,
  faqContent,
  faqTitle,
  open,
  rotate,
  plusIcon,
} = style;

const faqsData: Faq[] = [
  {
    id: "1",
    title: "I am new to this whole thing what should I do?",
    content: `You will basically need a domain name and a hosting service to start with.
    <br /><br />
    If you don’t have any idea or need my help in any step, then feel free to <Link href="/contact-us">contact us</Link>, we will make sure to guide you step-by-step to get started with your website.`,
  },
  {
    id: "2",
    title: "Will I be able to update the site myself when it’s finished?",
    content: "Yes, we will make the website editable as per your needs. You will have full control to the code and backend of the website. <br /> However, not every part of the website would be editable and you might need our development team to do it for you. We charge on hourly basis without rates being $95/hr.",
  },
  {
    id: "3",
    title: "Do you provide website domain and hosting service?",
    content: `No, it would be your responsibility to get these services before we start the project.
    <br /><br />
    But, we can recommend to you the best available domain provider and hosting company that we personally use and also recommend to all our clients.`,
  },
  {
    id: "4",
    title: "I don't have any content (text or images or logo).",
    content: `Website Content: We will write compelling website content which would be optimized to get you more leads & sales.
    <br /><br />
    Images: Having subscriptions to premium stock image websites, we use them on our client's websites.
    <br /><br />
    Company Logo: As we are a specialist in website design only, hence we can't make logos. But don't worry, we know amazing logo designers and we will outsource the work to them. They are known for making amazing designs and are also really affordable.`,
  },
  {
    id: "5",
    title: "How much input do I have in the website design process?",
    content: `We will discuss a lot of questions regarding your business. The more we discuss, the better we get to know your business, the goals that you have with it and the better off the website would come out to be.
    <br /><br />
    We won’t compromise with discussing in details about your business, so you finally get the best website possible.`,
  },
];

function FaqsSection() {
  return (
    <section className={faqs}>
      <div className={`${container} dContainer`}>
        <h4 className="topTag text-center">Frequently Asked Questions</h4>
        <h2>Questions? Look here.</h2>

        <div className={faqContainer}>
          {faqsData.map((item: Faq) => (
            <Accordian key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqsSection;

const Accordian = ({ id, title, content }: Faq) => {
  const [active, setActive] = useState<boolean>(false);
  const contentRef = useRef<any>(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleFaq = () => setActive(() => !active);

  return (
    <div key={id} className={`${faq} ${active}`} onClick={toggleFaq}>
      <div className={faqTitle}>
        <h3>{title}</h3>
        <span>
          <FiPlus className={`${active ? rotate : null} ${plusIcon}`} />
        </span>
      </div>

      <div ref={contentRef} className={`${active ? open : null} ${faqContent}`}>
        <p dangerouslySetInnerHTML={{__html: content}} />
      </div>
    </div>
  );
};
