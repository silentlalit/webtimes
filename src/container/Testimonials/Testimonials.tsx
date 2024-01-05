"use client";

import Image from "next/image";

// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Testimonial } from "../../utils/interface";

import styles from "./Testimonials.module.scss";
import { useAppSelector } from "@/redux/hook";
const {
  testimonial_section,
  container,
  mySwiper,
  review_card,
  review_card_img,
  review_author,
  material_icons,
  review_content,
} = styles;

// const testimonials: Testimonial[] = [
//   {
//     _id: "1",
//     name: "Arjun",
//     comment: `Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut
//         lacinia in, elementum id enim. Curabitur aliquet quam id dui posuere blandit.
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
//     rating: 5,
//     avatar:
//       "https://static.wixstatic.com/media/60aa73_f7ef8dc0e0554fc7a86907d5e5ae0de8~mv2.png/v1/fill/w_400,h_400,al_c/coming-soon.png",
//     serviceCat: {
//       label: "ui/ux",
//       value: "UI/Ux",
//     },
//   },
//   {
//     _id: "2",
//     name: "Arjun",
//     comment: `Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut
//         lacinia in, elementum id enim. Curabitur aliquet quam id dui posuere blandit.
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut
//         lacinia in, elementum id enim. Curabitur aliquet quam id dui posuere blandit.
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
//     rating: 5,
//     avatar:
//       "https://static.wixstatic.com/media/60aa73_f7ef8dc0e0554fc7a86907d5e5ae0de8~mv2.png/v1/fill/w_400,h_400,al_c/coming-soon.png",
//     serviceCat: {
//       label: "ui/ux",
//       value: "UI/Ux",
//     },
//   },
//   {
//     _id: "3",
//     name: "Arjun",
//     comment: `Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut
//         lacinia in, elementum id enim. Curabitur aliquet quam id dui posuere blandit.
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
//     rating: 5,
//     avatar:
//       "https://static.wixstatic.com/media/60aa73_f7ef8dc0e0554fc7a86907d5e5ae0de8~mv2.png/v1/fill/w_400,h_400,al_c/coming-soon.png",
//     serviceCat: {
//       label: "ui/ux",
//       value: "UI/Ux",
//     },
//   },
//   {
//     _id: "4",
//     name: "Arjun",
//     comment: `Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut
//         lacinia in, elementum id enim. Curabitur aliquet quam id dui posuere blandit.
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
//     rating: 5,
//     avatar:
//       "https://static.wixstatic.com/media/60aa73_f7ef8dc0e0554fc7a86907d5e5ae0de8~mv2.png/v1/fill/w_400,h_400,al_c/coming-soon.png",
//     serviceCat: {
//       label: "ui/ux",
//       value: "UI/Ux",
//     },
//   },
// ];

const Testimonials = ({ breakPoints }: any) => {
  const {testimonials, loading} = useAppSelector((state) => state.testimonial);

  const breakPointsObj = breakPoints || {
    300: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1500: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  };

  return (
    <section className={testimonial_section}>
      <ul className={`${container} dContainer`} onCopy={() => false}>
        <h4 className="topTag text-center">Reviews</h4>
        <h2>What our Clients says</h2>

        <Swiper
          className={`${mySwiper} testimonialSwiper`}
          centeredSlides={true}
          modules={[Pagination, Navigation, Scrollbar]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={breakPointsObj}>
          {testimonials?.map(
            ({ _id, avatar, name, rating, comment }: Testimonial) => (
              <SwiperSlide key={_id}>
                <li className={review_card}>
                  <div className={review_card_img}>
                    <div
                      className="image_wrapper"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}>
                      <Image
                        src={`/upload/reviews/${avatar}`}
                        alt={`${name}`}
                        width={80}
                        height={80}
                        object-fit="contain"
                      />
                    </div>
                  </div>

                  <div className={review_author}>
                    <span>{name}</span>
                    <ul>
                      {[...Array(rating)].map((e, i) => (
                        <li key={i}>
                          <span className={material_icons}>&#9733;</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={review_content}>
                    <p>{comment}</p>
                  </div>
                </li>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </ul>
    </section>
  );
};

export default Testimonials;
