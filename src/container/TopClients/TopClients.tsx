import React from "react";
import Image from "next/image";
import styles from "./topClients.module.scss";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const { container, topClinets, topClinets_wrapper, topClinets_box } = styles;

type Client = {
  Icon: string;
  label: string;
};
const clients: Client[] = [
  {
    Icon: "/clients/celedonLaw.png",
    label: "Celedon Law",
  },
  {
    Icon: "/clients/eliteExpress.png",
    label: "Elite Express",
  },
  {
    Icon: "/clients/els.svg",
    label: "Elassadi logistics solutions",
  },
  {
    Icon: "/clients/taxi4.png",
    label: "Taxi4Melbourne",
  },
];

const ServiceIndustries = () => {
  const breakPointsObj = {
    300: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  };

  return (
    <section className={topClinets} data-aos="fade-up">
      <div className={`${container} dContainer`}>
        <h2>Our Top Clients</h2>
        <p>
          We have been fortunate enough to create websites for hundreds of
          business owners over the last five years with clients throughout the
          world.
        </p>

        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          autoplay={{ delay: 500 }}
          scrollbar={{ draggable: true }}
          loop={true}
          modules={[Autoplay]}
          className={topClinets_wrapper}
          breakpoints={breakPointsObj}>
          {clients.map(({ Icon, label }: any, idx: number) => (
            <SwiperSlide key={idx + label} className={topClinets_box}>
              <Image src={Icon} alt={label} width={200} height={100} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ServiceIndustries;
