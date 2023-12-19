import { connectDb } from "@/app/api/middleware/mongoose";
import Testimonial from "@/app/api/models/testimonial";
import Error from "@/app/api/middleware/Error";
import { NextRequest, NextResponse } from "next/server";

// GET A SINGLE Testimonial DETAILS
export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const { id } = params;
    const testimonial = await Testimonial.findById(id).exec();

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

    const body = await req.json();
    const { id } = params;

    let testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return Error({ message: "id Not found" });
    }

    testimonial = await Testimonial.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return NextResponse.json({ success: true, testimonial }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Error(error);
  }
};

// DELETE a Testimonial
export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const { id } = params;
    await Testimonial.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        id: id,
        message: "Testimonial deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Error(error);
  }
};
