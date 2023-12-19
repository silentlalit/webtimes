"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  TextInput,
  SingleFileSelect,
  TextareaInput,
  SelectMultipleTags,
  RatingInput,
} from "@/components";
import { TestimonialSchema } from "@/utils/schema";
import { useRouter } from "next/navigation";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  createTestimonial,
  getTestimonial,
  updateTestimonial,
} from "@/redux/slices/testimonialsSlice";
import { AppDispatch, RootState } from "@/redux/store/store";

const serviceOptionList = [
  { value: "reactJs", label: "ReactJs" },
  { value: "nextJs", label: "NextJs" },
];

const defaultValues = {
  name: "",
  comment: "",
  rating: "",
  avatar: "",
  serviceCat: [],
};

function Page({ params }: any) {
  const { testimonialId } = params;
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { testimonials, testimonial, loading, error } = useSelector(
    (state: RootState) => state.testimonial
  );
  const [editTestimonial, setEditTestimonial] = useState<any>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(TestimonialSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (!testimonials.length && testimonialId !== "new") {
      dispatch(getTestimonial(testimonialId));
    } else {
      setEditTestimonial(() =>
        testimonialId === "new"
          ? ""
          : testimonials.filter(
              (testimonial) => testimonialId === testimonial._id
            )[0]
      );
    }
  }, [testimonialId, dispatch, testimonials]);

  useEffect(() => {
    reset({
      name: testimonial?.name || editTestimonial?.name,
      comment: testimonial?.comment || editTestimonial?.comment,
      serviceCat: testimonial?.serviceCat || editTestimonial?.serviceCat,
      rating: testimonial?.rating || editTestimonial?.rating,
      avatar: testimonial?.avatar || editTestimonial?.avatar,
    });
  }, [testimonial, editTestimonial, reset]);

  const getData = () => {
    if (testimonialId === "new") {
      return { name: "", comment: "", serviceCat: "", rating: "", avatar: "" };
    } else {
      return testimonial || editTestimonial;
    }
  };

  const { avatar, serviceCat }: any = getData();

  const saveChanges = async (data: any) => {
    if (testimonialId === "new") {
      await dispatch(createTestimonial(data));
    } else {
      await dispatch(updateTestimonial({ _id: testimonialId, ...data }));
    }

    if (!loading) {
      if (!error) {
        push("/cms/testimonials");
      }
    }
  };

  return (
    <div className="cms_editService">
      <h1>Edit Testimonial</h1>
      {!testimonial && !editTestimonial ? (
        <p>Loading...</p>
      ) : (
        <form>
          <TextInput
            placeholder="Name"
            control={control}
            name="name"
            error={errors.name}
          />

          <SelectMultipleTags
            placeholder="Select related Service"
            control={control}
            name="serviceCat"
            error={errors.serviceCat}
            isSearchable={true}
            selected={[serviceCat]}
            options={serviceOptionList}
          />
          <RatingInput control={control} name="rating" error={errors.rating} />

          <TextareaInput
            placeholder="Write your Review about the service."
            control={control}
            name="comment"
            error={errors.comment}
          />

          <SingleFileSelect
            placeholder="Select a review image:"
            control={control}
            name="avatar"
            error={errors.avatar}
            file={avatar}
          />

          <Button
            type="submit"
            title="Save Review"
            wrapperStyle={{
              marginTop: 40,
              pointerEvents: loading ? "none" : "all",
            }}
            onClick={handleSubmit(saveChanges)}
            loading={loading}
            disabled={loading}
          />
        </form>
      )}
    </div>
  );
}

export default Page;
