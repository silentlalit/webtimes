// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from "next/server";
import Error from "../../middleware/Error";
import ApiFeatures from "../../helper/ApiFeatures";
import Testimonial from "../../models/testimonial";
import { connectDb } from "../../middleware/mongoose";

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
  try {
    await connectDb();
    const bodyData = await req.json();
    const testimonial = await Testimonial.create(bodyData);

    return NextResponse.json({ success: true, testimonial }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
