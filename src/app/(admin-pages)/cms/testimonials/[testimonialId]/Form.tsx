"use client"

import React, { useEffect, useState } from 'react';
import {
    Button,
    TextInput,
    SingleFileSelect,
    TextareaInput,
    RatingInput,
  } from "@/components";
  import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TestimonialSchema } from "@/utils/schema";
import { useAppDispatch } from '@/redux/hook';
import { createTestimonial, updateTestimonial } from '@/redux/slices/testimonialsSlice';
import toast from 'react-hot-toast';

const defaultValues = {
    name: "",
    comment: "",
    rating: "",
    avatar: ""
};

const Form = ({testimonial, testimonialId, push}:any) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

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
        reset({
            name: testimonial?.name,
            comment: testimonial?.comment,
            rating: testimonial?.rating,
            avatar: testimonial?.avatar,
        });
    }, [testimonial, reset]);

    const { avatar } = testimonial || "";

    const saveChanges = async (data: any) => {
        setLoading(true);
        const fd = new FormData();

        fd.append("name", data.name);
        fd.append("comment", data.comment);
        fd.append("rating", data.rating);
        fd.append("avatar", data.avatar);

        if (testimonialId === "_new") {
            try {
                const {payload} = await dispatch(createTestimonial(fd));
                toast.success(payload.message);
                push(`/cms/testimonials?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`);
                setLoading(false);
            } catch (error: any) {
                toast.error(error.message);
                setLoading(false);
            }
        } else {
            fd.append("id", testimonialId);

            try {
                const { payload }: any = await dispatch(updateTestimonial(fd));
                toast.success(payload.message);
                push(`/cms/testimonials?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`);
                setLoading(false);
            } catch (error: any) {
                toast.error(error.message);
                setLoading(false);
            }
        }
    };

  return (
    <form>
          <TextInput
            placeholder="Name"
            control={control}
            name="name"
            error={errors.name}
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
            url="/upload/reviews/"
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
  )
}

export default Form