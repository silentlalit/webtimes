"use client";

import React, { useEffect, useRef } from "react";
import { BsArrowUpCircle } from "react-icons/bs";

function ReturnToTop() {
  const toTopRef = useRef<any>();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        toTopRef.current.style.display = "block";
      } else {
        toTopRef.current.style.display = "none";
      }
    });
  }, []);
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <div ref={toTopRef} id="toTop" onClick={scrollToTop}>
      <BsArrowUpCircle />
    </div>
  );
}

export default ReturnToTop;
