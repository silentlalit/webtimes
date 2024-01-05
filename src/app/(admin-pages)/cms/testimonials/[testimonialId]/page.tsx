"use client";

import React, { useEffect } from "react";
import {
  ButtonTag,
  Loader,
} from "@/components";

// redux
import { useSelector, useDispatch } from "react-redux";
import { clearTestimonial, getTestimonial } from "@/redux/slices/testimonialsSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import Form from "./Form";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

function Page({ params }: any) {
  const {back, push} = useRouter();
  const { testimonialId } = params;
  const dispatch = useDispatch<AppDispatch>();
  const { testimonial, loading } = useSelector((state: RootState) => state.testimonial);

  useEffect(() => {
    testimonialId !== "_new" && dispatch(getTestimonial(testimonialId));

    return () => {
      dispatch(clearTestimonial());
    };
  }, [testimonialId, dispatch]);

  return (
    <div className="cms_editService">
      <h2>{testimonialId !== "_new" ? "Update Testimonial" : "Create Testimonial"}</h2>
      <hr />

      {loading && testimonialId !== "_new" ? (
        <Loader />
      ) : (
        <>
        <ButtonTag
            icon={<RiArrowGoBackFill />}
            text="Back to Services"
            onClick={() => back()}
            btnType="type2"
            style={{margin: "30px 0"}}
          />
          
        <Form testimonial={testimonial} testimonialId={testimonialId} push={push} />
        </>
      )}
    </div>
  );
}

export default Page;
