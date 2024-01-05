import { connectDb } from "@/app/api/middleware/mongoose";
import Testimonial from "@/app/api/models/testimonial";
import Error from "@/app/api/middleware/Error";
import { NextRequest, NextResponse } from "next/server";
import { ErrorRes } from "@/app/api/helper/ErrorRes";
import { deleteImage, uploadImage } from "@/app/api/helper/utils";

// GET A SINGLE Testimonial DETAILS
export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const { id } = params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return Error({ message: "id Not found" });
    }

    return NextResponse.json({ success: true, testimonial }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Error(error);
  }
};

// UPDATE a Testimonial
export const PATCH = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const formData = await req.formData();
    const { id } = params;

    const avatar: any = formData.get("avatar");
    if (!avatar) return ErrorRes(false, "No file received.", 400);

    const skill = await Testimonial.findById(id);

    if (!skill) return ErrorRes(false, "skill id Not found", 400);
    const isUpload = skill.avatar !== avatar;
    const oldAvatar = skill.avatar;

    // upload a thumbmail
    const filename = isUpload
      ? await uploadImage("public/upload/reviews/", avatar)
      : avatar;

    const testimonialData = Object.fromEntries(formData);
    testimonialData.technologies = JSON.parse(String(testimonialData.technologies));
    testimonialData.image = filename;

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, testimonialData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!updatedTestimonial) {
      isUpload && deleteImage("public/upload/reviews/", filename);

      return ErrorRes(false, "Something went wrong! update failed", 400);
    } else {
      isUpload && deleteImage("public/upload/reviews/", oldAvatar);
    }

    return NextResponse.json({ success: true, testimonial: updatedTestimonial, message: "Testimonial Updated." }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};

// DELETE a Testimonial
export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const { id } = params;
    const testimonial: any = await Testimonial.findByIdAndDelete(id);

    if (testimonial) {
      deleteImage("public/upload/reviews/", testimonial.image);
    }

    return NextResponse.json({
      success: true,
      id: id,
      message: "Testimonial deleted",
    });
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
