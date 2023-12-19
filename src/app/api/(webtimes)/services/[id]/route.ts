import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/app/api/middleware/mongoose";
import Service from "@/app/api/models/service";
import { ErrorRes } from "@/app/api/helper/ErrorRes";
import { uploadImage, deleteImage } from "@/app/api/helper/utils";

// GET A SINGLE SERVICE DETAILS
export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const { id } = params;
    const service = await Service.findById(String(id));

    if (!service) {
      return ErrorRes(false, "id Not found", 400);
    }

    return NextResponse.json(
      { success: true, message: "Service fetched.", service },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};

// UPDATE a Servces
export const PATCH = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const formData = await req.formData();
    const { id } = params;

    const thumbnail: any = formData.get("thumbnail");
    if (!thumbnail) return ErrorRes(false, "No file received.", 400);

    const service = await Service.findById(id);

    if (!service) return ErrorRes(false, "Service id Not found", 400);

    const isUpload = service.thumbmail === thumbnail;
    const oldThumbnail = service.thumbnail;

    // upload a thumbmail
    const filename = isUpload
      ? await uploadImage("public/upload/services/", thumbnail)
      : thumbnail;

    const serviceData = Object.fromEntries(formData);
    serviceData.technologies = JSON.parse(String(serviceData.technologies));
    serviceData.priceList = JSON.parse(String(serviceData.priceList));
    serviceData.thumbnail = filename;

    const updatedService = await Service.findByIdAndUpdate(id, serviceData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!updatedService) {
      isUpload && deleteImage("public/upload/services/", filename);
      return ErrorRes(false, "Something went wrong! update failed", 400);
    } else {
      isUpload && deleteImage("public/upload/services/", oldThumbnail);
    }

    return NextResponse.json(
      { success: true, message: "Service Updated.", service: updatedService },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};

// DELETE a Service
export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const { id } = params;
    const service: any = await Service.findByIdAndDelete(id);

    if (service) {
      [service.thumbnail, ...service.images].forEach((file) =>
        deleteImage("public/upload/services/", file)
      );
    }

    return NextResponse.json({
      success: true,
      id: id,
      message: "Service deleted",
    });
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
