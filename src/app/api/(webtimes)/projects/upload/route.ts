// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from "next/server";
import { ErrorRes } from "@/app/api/helper/ErrorRes";
import { connectDb } from "@/app/api/middleware/mongoose";
import Project from "@/app/api/models/project";
import { uploadImage, deleteImage } from "@/app/api/helper/utils";

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();

    const formData = await req.formData();

    const files: any = formData.getAll("files");
    const id: any = formData.get("id");

    const project = await Project.findById(id);

    if (!files || !project)
      return ErrorRes(
        false,
        "No files received. or project id is invalid",
        400
      );

    const fileUrls = await Promise.allSettled(
      files.map(async (file: File) => {
        const filename = await uploadImage("public/upload/projects/", file);
        return filename;
      })
    );

    const urls = fileUrls.map((url: any) => {
      if (url.status === "fulfilled") return url.value;
    });

    project.images = [...urls, ...project.images];

    await project.save();

    return NextResponse.json(
      {
        success: true,
        message: "Images Updated",
        images: project.images,
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

    const project = await Project.findById(id);

    if (!file || !project)
      return ErrorRes(false, "No file received. or project id is invalid", 400);

    // upload image
    const filename = await uploadImage("public/upload/projects/", file);

    // delete image
    deleteImage("public/upload/projects/", updateName);

    const data: string[] = project.images.filter(
      (img: string) => img !== updateName
    );
    project.images = [filename, ...data];

    await project.save();

    return NextResponse.json(
      {
        success: true,
        message: `Image ${filename} Updated`,
        images: project.images,
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

    const project = await Project.findById(id);

    if (!deleteFilename || !project)
      return ErrorRes(
        false,
        "No filename recieved. or project id is invalid",
        400
      );

    // delete image
    deleteImage("public/upload/projects/", deleteFilename);

    // update service images
    project.images = project.images.filter(
      (image: string) => image !== deleteFilename
    );

    await project.save();

    return NextResponse.json(
      {
        success: true,
        message: `Image ${deleteFilename} deleted`,
        images: project.images,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
