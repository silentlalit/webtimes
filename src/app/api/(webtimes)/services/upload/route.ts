// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from "next/server";
import { ErrorRes } from "@/app/api/helper/ErrorRes";
import Service from "@/app/api/models/service";
import { connectDb } from "@/app/api/middleware/mongoose";
import { uploadImage, deleteImage } from "@/app/api/helper/utils";

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();

    const formData = await req.formData();

    const files: any = formData.getAll("files");
    const id: any = formData.get("id");

    const service = await Service.findById(id);

    if (!files || !service)
      return ErrorRes(
        false,
        "No files received. or service id is invalid",
        400
      );

    const fileUrls = await Promise.allSettled(
      files.map(async (file: File) => {
        const filename = await uploadImage("public/upload/services/", file);
        return filename;
      })
    );

    const urls = fileUrls.map((url: any) => {
      if (url.status === "fulfilled") return url.value;
    });

    service.images = [...urls, ...service.images];

    await service.save();

    return NextResponse.json(
      {
        success: true,
        message: "Images Updated",
        images: service.images,
        result: fileUrls,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await connectDb();

    const formData = await req.formData();

    const file: any = formData.get("file");
    const updateName: any = formData.get("filename");
    const id: any = formData.get("id");

    const service = await Service.findById(id);

    if (!file || !service)
      return ErrorRes(false, "No file received. or service id is invalid", 400);

    // upload image
    const filename = await uploadImage("public/upload/services/", file);

    // delete image
    deleteImage("public/upload/services/", updateName);

    const data = service.images.filter((img: string) => img !== updateName);
    service.images = [filename, ...data];

    await service.save();

    return NextResponse.json(
      {
        success: true,
        message: `Image ${filename} Updated`,
        images: service.images,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectDb();

    const p: any = req.nextUrl;
    const { id, filename: deleteFilename } = JSON.parse(
      p.searchParams.get("data")
    );

    const service = await Service.findById(id);

    if (!deleteFilename || !service)
      return ErrorRes(
        false,
        "No filename recieved. or service id is invalid",
        400
      );

    // delete image
    deleteImage("public/upload/services/", deleteFilename);

    // update service images
    service.images = service.images.filter(
      (image: string) => image !== deleteFilename
    );

    await service.save();

    return NextResponse.json(
      {
        success: true,
        message: `Image ${deleteFilename} deleted`,
        images: service.images,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
