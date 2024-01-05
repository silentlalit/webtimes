// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from "next/server";
import Error from "../../middleware/Error";
import ApiFeatures from "../../helper/ApiFeatures";
import Testimonial from "../../models/testimonial";
import { connectDb } from "../../middleware/mongoose";
import { ErrorRes } from "../../helper/ErrorRes";
import { deleteImage, uploadImage } from "../../helper/utils";

// GET all Servces
export const GET = async (req: NextRequest) => {
  try {
    await connectDb();

    const resultPerPage = 10;
    const testimonialCount = await Testimonial.countDocuments();

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const apiFeature = new ApiFeatures(Testimonial.find(), searchParams)
      .search()
      .filter()
      .pagination(resultPerPage);

    const testimonials = await apiFeature.query;

    return NextResponse.json(
      { success: true, testimonialCount, testimonials },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};

// CREATE a testimonial
export const POST = async (req: NextRequest) => {
  let ifErrorDelete = "";

  try {
    await connectDb();

    const formData = await req.formData();
    const avatar: any = formData.get("avatar");
    if (!avatar) return ErrorRes(false, "No files received.", 400);

    // upload a review avatar
    const filename = await uploadImage("public/upload/reviews/", avatar);
    ifErrorDelete = filename;

    const testimonialData = Object.fromEntries(formData);
    testimonialData.avatar = filename;

    const testimonial = await Testimonial.create(testimonialData);

    if (!testimonial) {
      deleteImage("public/upload/reviews/", filename);
      return ErrorRes(false, "Something went wrong!", 400);
    }

    return NextResponse.json({ success: true, testimonial, message: "testimonial created.", }, { status: 200 });
  } catch (error: any) {
    console.log(error)
    deleteImage("public/upload/reviews/", ifErrorDelete);
    return ErrorRes(false, error.message, 500);
  }
};
