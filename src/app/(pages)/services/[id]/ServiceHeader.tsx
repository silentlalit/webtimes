"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import styles from "@/styles/servicePage.module.scss";

const { serviceHeader, serviceImage, serviceImagesContainer } = styles;

const ServiceHeader = ({ images }: { images: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();

  return (
    <div className={serviceHeader}>
      {images.length && (
        <>
          <Swiper
            loop={true}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className={serviceImage}>
            {images?.map((image, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={`/upload/services/${image}`}
                  fill
                  sizes="100vw"
                  alt={`service${idx}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className={serviceImagesContainer}>
            {images?.map((image, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={`/upload/services/${image}`}
                  fill
                  alt={`service${idx}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default ServiceHeader;
