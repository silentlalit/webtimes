"use client";

import React, { useEffect } from "react";
import { GrFormAdd } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ButtonTag, Loader } from "@/components";
import styles from "@/styles/cmsServicesPage.module.scss";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTestimonials,
  deleteTestimonial,
} from "@/redux/slices/testimonialsSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { trimContent } from "@/utils/utileFun";

const {
  cms_servicesPage,
  servicesListing,
  serviceLisItem,
  itemTitle,
  itemEdit,
} = styles;

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { testimonials, loading } = useSelector(
    (state: RootState) => state.testimonial
  );

  useEffect(() => {
    !testimonials.length && dispatch(fetchTestimonials());
  }, [dispatch, testimonials.length]);

  return (
    <div className={cms_servicesPage}>
      <h1>Testimonials</h1>

      <Link href={`/cms/testimonials/_new?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`}>
        <ButtonTag icon={<GrFormAdd color="#fff" />} text="Add new Review" />
      </Link>

      <div className={servicesListing}>
        {loading ? (
          <Loader />
        ) : (
          testimonials?.map(({ _id, name, rating, comment, avatar }: any) => (
            <div key={_id} className={serviceLisItem}>
              <div className={itemTitle}>
                <Image
                  src={`/upload/reviews/${avatar}`}
                  width={50}
                  height={50}
                  alt={name}
                  object-fit="contain"
                />
                <div>
                  <h3>{name}</h3>
                  <h5>Rating: {rating}</h5>
                  <p style={{ marginTop: 0 }}>{trimContent(comment, 55)}...</p>
                </div>
              </div>

              <div className={itemEdit}>
                <span>
                  <Link href={`/cms/testimonials/${_id}?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`}>
                    <AiFillEdit />
                  </Link>
                </span>
                <span>
                  <AiFillDelete
                    onClick={() => dispatch(deleteTestimonial(_id))}
                  />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
