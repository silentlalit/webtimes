// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from "next/server";
import ApiFeatures from "../../helper/ApiFeatures";
import Service from "../../models/service";
import { connectDb } from "../../middleware/mongoose";
import { ErrorRes } from "../../helper/ErrorRes";
import { uploadImage, deleteImage } from "../../helper/utils";

// GET all Servces
export const GET = async (req: NextRequest) => {
  try {
    await connectDb();

    const resultPerPage = 10;
    const serviceCount = await Service.countDocuments();

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const apiFeature = new ApiFeatures(Service.find(), searchParams)
      .search()
      .filter()
      .pagination(resultPerPage);

    const services = await apiFeature.query;

    return NextResponse.json({ success: true, serviceCount, services });
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};

// CREATE a service
export const POST = async (req: NextRequest) => {
  try {
    await connectDb();

    const formData = await req.formData();

    const thumbnail: any = formData.get("thumbnail");
    if (!thumbnail) return ErrorRes(false, "No files received.", 400);

    // upload image
    const filename = await uploadImage("public/upload/services/", thumbnail);

    const serviceData = Object.fromEntries(formData);
    serviceData.technologies = JSON.parse(String(serviceData.technologies));
    serviceData.priceList = JSON.parse(String(serviceData.priceList));
    serviceData.thumbnail = filename;

    const service = await Service.create(serviceData);

    if (!service) {
      deleteImage("public/upload/services/", filename);
      return ErrorRes(false, "Something went wrong!", 400);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Service created.",
        service,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
