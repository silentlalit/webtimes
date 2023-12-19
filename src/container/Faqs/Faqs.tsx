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
    title: "Lorem ipsum dolor sit amet,",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
          ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
          In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
          Fusce sed commodo purus, at tempus turpis.`,
  },
  {
    id: "2",
    title: "Nunc maximus, magna at ultricies elementum",
    content:
      "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
  },
  {
    id: "3",
    title: "Curabitur laoreet, mauris vel blandit fringilla",
    content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
        Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
        Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
        Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
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
        <p>{content}</p>
      </div>
    </div>
  );
};
