"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import styles from "@/styles/aboutUsPage.module.scss";

// import required modules
import { Pagination } from "swiper/modules";

const { teams, container, teamSwiper, swiperSlide, swiperSlide_img } = styles;

const teamWork = [
  {
    name: "Your Lead Designer",
    work: "The chief visionary behind your app's design, your UI/UX Designer makes sure that every app element fits together in form, aesthetic and function.",
    image: "/designer.svg",
  },
  {
    name: "Your Lead Developer",
    work: "The chief architect of programming and building out your future app's logic for iOS, Android and Web. You'd also be correct in calling them a magician.",
    image: "/developer.svg",
  },
  {
    name: "Your QA Coordinator",
    work: "The chief of app testing, your QA Coordinator works behind the scenes testing development builds and assisting during Quality Assurance. ",
    image: "/coordinator.png",
  },
  {
    name: "Your Project Support",
    work: "We believe app development should be a team effort, and all of us are ready to jump in at a moment's notice to ensure your app is in good hands.",
    image: "/team_support.svg",
  },
  {
    name: "Your Dedicated PM",
    work: "The chief of staff, your project manager is responsible for leading your team and guiding you to make sure everything is running smoothly as we build. ",
    image: "/project_manager.png",
  },
] as {
  name: string;
  work: string;
  image: string;
}[];

function TeamWorkSlider() {
  const breakPoints = {
    300: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  };

  return (
    <section className={teams}>
      <div className={`${container} dContainer`}>
        <Swiper
          slidesPerView={3}
          spaceBetween={40}
          pagination={{ dynamicBullets: true }}
          loop={true}
          autoplay
          modules={[Pagination]}
          breakpoints={breakPoints}
          className={teamSwiper}>
          {teamWork.map(({ name, work, image }, idx) => (
            <SwiperSlide className={swiperSlide} key={idx}>
              <Image
                src={image}
                alt={name}
                width={100}
                height={100}
                className={swiperSlide_img}
              />
              <h3>{name}</h3>
              <p>{work}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TeamWorkSlider;
